import Navbar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import GetTopics from "../components/Topic/GetTopics";
import TopicButton from "../components/Topic/TopicButton";
import { useState, useEffect } from "react";
import { Col, Collapse, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useMediaQuery } from "@react-hook/media-query";

const TopicList = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowSidebar(!isSmallScreen);
  }, [isSmallScreen]);

  function handleToggleClick() {
    console.log("handleToggleClick", showSidebar);
    setShowSidebar(!showSidebar);
  }

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
            <TopicButton />
            <GetTopics />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopicList;
