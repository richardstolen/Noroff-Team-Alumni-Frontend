import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Storage from "../../storage/storage";
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getEventbyId, getEventByUser, createEvent } from "../../api/eventApi";
import EventCards from "./EventCards";

const fetchData = async () => {
  const data = await getEventByUser();
  return data;
};

const EventThread = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    let eventFromStorage = Storage.getEventByUser();
    if (eventFromStorage == null) {
      fetchData().then(event => {
        setEvent(mapEvents(event));
        Storage.setEvent(event);

      });
      console.log(event)
    } else {
      setEvent(mapEvents(eventFromStorage));
    }
  }, []);


  const mapEvents = (events) => {
    return events.map((event, i) => {
      return <EventCards prop={event} key={i} style={{ textAlign: "center" }}>{event.description}</EventCards>})
    }
  
  // event.map((event, i) => {
  //   return ( <p
  //     prop={event}
  //     key={i}
  //     style={{
  //       display: "flex", 
  //       justifyContent: "center", 
  //       alignItems: "center", 
  //       height: "100vh", 
  //     }}>
  //       {event.description}
  //   </p> )


  return (
    <>{event ? event : <PulseLoader className="spinning-wheel" color="#0d6efd" />}</>

  )
}

export default EventThread;


