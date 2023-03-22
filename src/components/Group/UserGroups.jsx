import React from "react";
import { ListGroup } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown  from "react-bootstrap/NavDropdown";

const UserGroups = ({ groups }) => {
  
  const groupLinks = groups.map((group) => (
    <NavDropdown.Item key={group.groupId} href={"/group-detail"}>
      {group.name}
    </NavDropdown.Item>
  
  ));

  return (
    <div>
     
      {groupLinks}
    
    </div>
  );
};

export default UserGroups;
