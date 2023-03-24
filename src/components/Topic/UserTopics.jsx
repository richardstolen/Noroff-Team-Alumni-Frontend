import React from "react";
import NavDropdown  from "react-bootstrap/NavDropdown";

const UserTopics = ({ topics }) => {
  
  const topicLinks = topics.map((topic) => (
    <NavDropdown.Item key={topic.topicId} href={`/topic-detail/${topic.topicId}`}>
      {topic.name}
    </NavDropdown.Item>
  
  ));

  return (
    <div>
     
      {topicLinks}
    
    </div>
  );
};

export default UserTopics;
