import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav  from 'react-bootstrap/Nav';

function Sidebar1() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View sidebar
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Current page</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            
            
            <p>Groups</p>

            <p> Topics </p>

            <p>Events</p> 



        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar1;