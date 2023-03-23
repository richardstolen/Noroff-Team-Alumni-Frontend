import NavBar1 from "../components/Navbar/Navbar1";
import Sidebar from "../components/Sidebar/Sidebar";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../api/apiHandler";
import Card  from "react-bootstrap/Card";
import GetGroupPost from "../components/Group/GetGroupPost";

const GroupDetail = () => {


  const [group, setGroup] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroup(id);   
        setGroup(data);
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
      <div className="centralize">
      
        {group ? (
          <Card style={{width: '40rem', height: '10rem'} } className="mt-5">
          <Card.Body>
          <Card.Title>{group.name}</Card.Title>
          <Card.Text>{group.description}</Card.Text>
          </Card.Body>
          </Card>
        ): (
          <p>Loading...</p>
        
        )}
      
      </div>

      <GetGroupPost/>

      
      <CalendarSidebar/>    
    </>
  );
};

export default GroupDetail;
