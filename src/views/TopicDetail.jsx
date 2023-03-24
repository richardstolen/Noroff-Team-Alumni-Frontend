import NavBar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../api/topicApi";
import Card  from "react-bootstrap/Card";
import GetTopicPost from "../components/Topic/GetTopicPost";

const TopicDetail = () => {


  const [topic, setTopic] = useState(null);
  const { id } = useParams();

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
      <NavBar1 />
      <Sidebar/>
      <CalendarSidebar/> 
      <div className="centralize">
      
        {topic ? (
          <Card style={{width: '40rem', height: '10rem'} } className="mt-5">
          <Card.Body>
          <Card.Title>{topic.name}</Card.Title>
          <Card.Text>{topic.description}</Card.Text>
          </Card.Body>
          </Card>
        ): (
          <p>Loading...</p>
        
        )}
      
      </div>

      <GetTopicPost/>

      
         
    </>
  );
};

export default TopicDetail;
