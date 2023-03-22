import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, onChange] = useState(new Date());


  return (
    <>
      <div className='d-flex justify-content-end mt-2'>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Show Calendar
      </Button>

      </div>
      
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Event calendar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Calendar/>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function CalendarSidebar() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default CalendarSidebar;