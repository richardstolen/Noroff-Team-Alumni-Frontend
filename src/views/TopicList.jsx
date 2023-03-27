import Navbar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import GetTopics from "../components/Topic/GetTopics";
import TopicButton from "../components/Topic/TopicButton";
import { useState, useEffect, useRef } from "react";
import { Col, Collapse, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useMediaQuery } from "@react-hook/media-query";

const TopicList = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const count = useRef(0);

  function trigger(e, num) {
    console.log("trigger in topiclist");
    count.current = count.current + 1;
    return setRefreshTrigger(refreshTrigger + num);
    console.log(count);
  }

  useEffect(() => {
    setShowSidebar(!isSmallScreen);
  }, [isSmallScreen, refreshTrigger, trigger, setRefreshTrigger]);

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
                <Sidebar props={trigger} />
              </div>
            </Collapse>
          </Col>
          <Col xl={2} md={3} className="d-none d-md-block sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xl={10} md={9}>
            <TopicButton />
            <GetTopics trigger={trigger} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopicList;
