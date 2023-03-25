import Navbar1 from "../components/Navbar/Navbar1";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import TimelineFeed from "../components/Shared/TimelineFeed";
import { useState, useEffect } from "react";
import Storage from "../storage/storage";
import { getPosts } from "../api/apiHandler";
import { PulseLoader } from "react-spinners";
import { Button } from "react-bootstrap";

const fetchData = async () => {
  const data = await getPosts();
  return data;
};

const Timeline = () => {
  const [posts, setPosts] = useState();
  const [value, setState] = useState(false);

  useEffect(() => {
    if (value) {
      fetchData().then((posts) => {
        setPosts(posts);
        Storage.setPosts(posts);
        document.body.style.cursor = "default";
        setState(false);
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
  }, [value, setPosts, setState]);

  return (
    <>
      <Navbar1 />
      <CalendarSidebar />
      <Sidebar />

      {!posts ? (
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      ) : (
        <>
          <TimelineFeed onChange={setState} postsFromParent={posts} />
        </>
      )}
    </>
  );
};

export default Timeline;
