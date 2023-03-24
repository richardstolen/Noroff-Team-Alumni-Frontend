import { useEffect, useState } from "react";
import { getGroupPost } from "../../api/apiHandler";
import Card from "react-bootstrap/Card";
import { id } from "date-fns/locale";
import { useParams } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar1";
import CalendarSidebar from "../Sidebar/CalendarSidebar";
import Sidebar from "../Sidebar/Sidebar";
import TimelineFeed from "../Shared/TimelineFeed";
import { PulseLoader } from "react-spinners";

const fetchData = async (id) => {
  const data = await getGroupPost(id);
  return data;
};

const GetGroupPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  const [value, setState] = useState(false);

  useEffect(() => {
    if (value) {
      fetchData(id).then((posts) => {
        setPosts(posts);
        document.body.style.cursor = "default";
        setState(false);
      });
    }

    fetchData(id).then((posts) => {
      setPosts(posts);
    });
  }, [value, setPosts, setState]);

  return (
    <>
      <CalendarSidebar />
      <Sidebar />
      {!posts ? (
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      ) : (
        <TimelineFeed onChange={setState} postsFromParent={posts} />
      )}
    </>
  );
};

export default GetGroupPost;
