// import { useState, useEffect } from "react";

// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import "react-big-calendar/lib/css/react-big-calendar.css";



// import { getEventByUser, getEventsByGroup } from "../api/eventApi";
// import { getUser } from "../api/apiHandler";
// import KeyCloakService from "../security/KeyCloakService.ts";
// import Storage from "../storage/storage";
// import Navbar1 from "../components/Navbar/Navbar1";
// import Sidebar from "../components/Sidebar/Sidebar";

// import "../App.css"

// // const mapEvents = (events) => {
// //     return events.map((event, i) => {
// //         return <div>{event.description}</div>;
// //     });
// // };

// const mapEvents = (events) => {
//     return events.map((event) => {
//         return <div key={event.id}>{event.description}</div>;
//     });
// };



// const fetchData = async () => {
//     const data = await getEventByUser();
//     return data;
// };



// const localizer = momentLocalizer(moment)



// function CalendarView({ userId }) {

//     const [userEvents, setUserEvents] = useState([]);
//     const searchedUser = Storage.getSearchedUser();
//     const [user, setUser] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [show, setShow] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [event, setEvent] = useState(null);

    


//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     useEffect(() => {
//         const fetchUserEvents = async () => {
//             const events = await getEventByUser(userId);
//             setUserEvents(events);
//         };

//         fetchUserEvents();
//         const fetchUser = async () => {
//             // If user has searched for user
//             let searchedUser = Storage.getSearchedUser();

//             if (searchedUser) {
//                 setUser(searchedUser);
//                 return;
//             }
//             // Get user from storage
//             let user = Storage.getUser();
//             if (!user) {
//                 // IF no user in storage
//                 // fetch user data by user_id from the API
//                 user = await getUser(KeyCloakService.GetId());
//                 console.log(user);
//                 Storage.setUser(user);
//             }

//             if (editMode) {
//                 console.log("edit mode", editMode);
//                 await getUser(KeyCloakService.GetId()).then((user) => {
//                     setUser(user);
//                     Storage.setUser(user);
//                     setEditMode(false);
//                     document.body.style.cursor = "default";
//                 });
//             } else {
//                 setUser(user);
//             }

//             console.log(user.groups);
//         };

//         let eventFromStorage = Storage.getEventByUser();
//         if (eventFromStorage == null) {
//             fetchData().then((event) => {
//                 setEvent(mapEvents(event));
//                 Storage.setEvent(event);
//             });
//             console.log(event);
//         } else {
//             setEvent(mapEvents(eventFromStorage));
//         }

//         fetchUser();
//     }, [userId, editMode]);

//     return (
//         <>
//             <Navbar1 />
//             <Sidebar />
//             <div className="calendar align-items-center text-center">
//                 <Calendar
//                     localizer={localizer}
//                     startAccessor="start"
//                     endAccessor="end"
//                     style={{ height: 500, width: "100%"}}
//                     className="border-0 shadow-sm"
//                     value={new Date()}
//                     tileContent={({ activeStartDate, date, view }) => {
//                         if (view === "month") {
//                             const eventsOnDate = userEvents.filter((event) => {
//                                 return (
//                                     event.date.substring(0, 10) === date.toISOString().substring(0, 10) 
//                                     //&& (!searchedUser || event.group === searchedUser.group)
//                                 )
//                             });
//                             return (
//                                 <>
//                                     {eventsOnDate.map((event) => (
//                                         <div key={event.id} className="mb-1">
//                                             <div className="badge bg-primary" key={event.id}>
//                                                 {event.description}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </>
//                             );
//                         }
//                     }}
//                 />
//             </div>
//         </>
//     );
// }

// export default CalendarView;





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
      <Navbar1 />
      <Sidebar />
      <div className="calendar align-items-center text-center">
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "70%", marginLeft: "300px", marginTop:"20px" }}
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
    </>
  );
}

export default CalendarView;