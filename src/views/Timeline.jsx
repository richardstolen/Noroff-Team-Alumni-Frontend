import Navbar1 from "../components/Navbar/Navbar1";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import TimelineFeed from "../components/Shared/TimelineFeed";
import { useState, useEffect } from "react";
import Storage from "../storage/storage";
import { getPosts } from "../api/apiHandler";
import { PulseLoader } from "react-spinners";
import { Button } from "react-bootstrap";
import { Col, Collapse, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useMediaQuery } from "@react-hook/media-query";
import Pointer from "../utils/mousePointer";

const fetchData = async () => {
  const data = await getPosts();
  return data;
};

const Timeline = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
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
    if (loading) {
      fetchData().then((posts) => {
        setPosts(posts);
        Storage.setPosts(posts);
        Pointer.setDefault();
        setLoading(false);
      });
    }

    let postsFromStorage = Storage.getPosts();
    if (postsFromStorage === null) {
      fetchData().then((posts) => {
        setPosts(posts);
        Storage.setPosts(posts);
      });
    } else {
      setPosts(postsFromStorage);
    }
  }, [loading, setPosts, setLoading]);

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
            {!posts ? (
              <PulseLoader className="spinning-wheel" color="#0d6efd" />
            ) : (
              <TimelineFeed onChange={setLoading} postsFromParent={posts} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Timeline;
