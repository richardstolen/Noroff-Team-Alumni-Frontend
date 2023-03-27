import Sidebar from "../components/Sidebar/Sidebar";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../api/apiHandler";
import Card from "react-bootstrap/Card";
import GetGroupPost from "../components/Group/GetGroupPost";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@react-hook/media-query";
import Navbar1 from "../components/Navbar/Navbar1";

const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowSidebar(!isSmallScreen);
  }, [isSmallScreen]);

  function handleToggleClick() {
    console.log("handleToggleClick", showSidebar);
    setShowSidebar(!showSidebar);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroup(id);
        setGroup(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

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
            <div className="centralize">
              {group ? (
                <Card
                  style={{ width: "40rem", height: "10rem" }}
                  className="mt-2"
                >
                  <Card.Body>
                    <Card.Title>{group.name}</Card.Title>
                    <Card.Text>{group.description}</Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <></>
              )}
            </div>
            <GetGroupPost />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GroupDetail;
