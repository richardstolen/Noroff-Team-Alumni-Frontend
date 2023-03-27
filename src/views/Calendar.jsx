import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEventByUser, getEventsByGroup } from "../api/eventApi";
import { getUser } from "../api/apiHandler";
import KeyCloakService from "../security/KeyCloakService.ts";
import Storage from "../storage/storage";
import Navbar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import "../App.css";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@react-hook/media-query";

const mapEvents = (events) => {
  return events.map((event) => {
    return {
      id: event.id,
      start: new Date(event.date),
      end: new Date(event.date),
      title: event.description
    };
  });
};

const localizer = momentLocalizer(moment);

const fetchData = async () => {
  const data = await getEventByUser();
  return data;
};

function CalendarView({ userId }) {
  const [userEvents, setUserEvents] = useState([]);
  const searchedUser = Storage.getSearchedUser();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState();

  //Sidebar stuff
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowSidebar(!isSmallScreen);
  }, [isSmallScreen]);

  function handleToggleClick() {
    console.log("handleToggleClick", showSidebar);
    setShowSidebar(!showSidebar);
  }
  // End sidebar stuff.

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      const events = await getEventByUser(userId);
      setUserEvents(events);
    };

    fetchUserEvents();
    const fetchUser = async () => {
      let searchedUser = Storage.getSearchedUser();

      if (searchedUser) {
        setUser(searchedUser);
        return;
      }

      let user = Storage.getUser();
      if (!user) {
        user = await getUser(KeyCloakService.GetId());
        Storage.setUser(user);
      }

      if (editMode) {
        await getUser(KeyCloakService.GetId()).then((user) => {
          setUser(user);
          Storage.setUser(user);
          setEditMode(false);
          document.body.style.cursor = "default";
        });
      } else {
        setUser(user);
      }
    };

    let eventFromStorage = Storage.getEventByUser();
    if (eventFromStorage == null) {
      fetchData().then((event) => {
        setEvent(mapEvents(event));
        Storage.setEvent(event);
      });
    } else {
      setEvent(mapEvents(eventFromStorage));
    }

    fetchUser();
  }, [userId, editMode]);

  return (
    <>
      <Navbar1 onToggleClick={handleToggleClick} />
      <Container style={{ paddingLeft: 0 }} fluid>
        <Row>
          <Col xl={2} md={3} className="d-block d-md-none sidebar">
            <Collapse in={showSidebar}>
              <div>
                <Sidebar />
              </div>
            </Collapse>
          </Col>
          <Col xl={2} md={3} className="d-none d-md-block sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xl={10} md={9}>
      <div className="calendar align-items-center text-center">
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "70%", marginLeft: "100px", marginTop:"20px" }}
          className="border-0 shadow-sm"
          value={new Date()}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "lightgray",
              color: "black",
              borderRadius: "0px",
              border: "none"
            };

            if (event.group === user.group) {
              newStyle.backgroundColor = "#3174ad";
            }

            return {
              className: "",
              style: newStyle
            };
          }}
        />
      </div>
      </Col>
      </Row>
      </Container>

    </>
  );
}

export default CalendarView;