import { useEffect, useState } from "react";
import { getGroupPost } from "../../api/apiHandler";
import Card  from "react-bootstrap/Card";
import { id } from "date-fns/locale";
import { useParams } from "react-router-dom";

const GetGroupPost = () => {


  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroupPost(id);   
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="centralize">
      
        {post ? (
          <div>
            <h1>{post.title}</h1>
            <h2>Created by: {post.userId}</h2>
            <p>{post.body}</p>
          </div>
        ): (
          <p>Loading...</p>
        
        )}
      
      </div>  
    </>
  );
};

export default GetGroupPost;
