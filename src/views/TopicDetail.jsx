import NavBar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../api/topicApi";
import Card from "react-bootstrap/Card";
import GetTopicPost from "../components/Topic/GetTopicPost";
import { Col, Collapse, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useMediaQuery } from "@react-hook/media-query";

const TopicDetail = () => {
  const [topic, setTopic] = useState(null);
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
        const data = await getTopic(id);
        setTopic(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <NavBar1 onToggleClick={handleToggleClick} />
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
            {topic ? (
              <Card
                style={{ width: "40rem", height: "10rem" }}
                className="mt-2"
              >
                <Card.Body>
                  <Card.Title>{topic.name}</Card.Title>
                  <Card.Text>{topic.description}</Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <></>
            )}
            <GetTopicPost />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopicDetail;
