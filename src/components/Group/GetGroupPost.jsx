import { useEffect, useState } from "react";
import { getGroupPost } from "../../api/apiHandler";
import { id } from "date-fns/locale";
import { useParams } from "react-router-dom";
import TimelineFeed from "../Shared/TimelineFeed";
import { PulseLoader } from "react-spinners";
import Pointer from "../../utils/mousePointer";

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
        Pointer.setDefault();
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

export default GetGroupPost;
