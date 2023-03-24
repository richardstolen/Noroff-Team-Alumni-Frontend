import { useEffect, useState } from "react";
import { getTopicPost } from "../../api/topicApi";
import { id } from "date-fns/locale";
import { useParams } from "react-router-dom";
import TimelineFeed from "../Shared/TimelineFeed";
import { PulseLoader } from "react-spinners";

const fetchData = async (id) => {
  const data = await getTopicPost(id);
  return data;
};

const GetTopicPost = () => {
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
      
      {!posts ? (
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      ) : (
        <TimelineFeed onChange={setState} postsFromParent={posts} />
      )}
    </>
  );
};

export default GetTopicPost;
