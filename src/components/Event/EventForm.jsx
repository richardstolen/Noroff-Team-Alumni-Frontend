import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Storage from "../../storage/storage";
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";
import {
  getEventbyId,
  getEventByUser,
  createEvent,
  getAcceptedEventByUser,
} from "../../api/eventApi";
import EventCards from "./EventCards";
import { Row, Col } from "react-bootstrap";
import { TriggerContext } from "../../contexts/triggerContext";
import { useContext } from "react";
import Pointer from "../../utils/mousePointer";

const fetchData = async () => {
  const data = await getEventByUser();
  return data;
};

const fetchEvents = async () => {
  const available = await getEventByUser();
  const accepted = await getAcceptedEventByUser();
  const events = {
    available: available,
    accepted: accepted,
  };
  return events;
};

const EventThread = () => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger, triggerRender] = useContext(TriggerContext);

  useEffect(() => {
    Pointer.setLoading();
    fetchEvents().then((events) => {
      const mappedEvents = mapEvents(events);

      Storage.setEvent(event);
      setEvent(mappedEvents);

      setLoading(false);
      Pointer.setDefault();
    });
  }, [setEvent, trigger]);

  const mapEvents = (events) => {
    if (!events) {
      return null;
    }

    const numCols = 3;
    const numRows = Math.ceil(events.available.length / numCols);
    const rows = Array.from({ length: numRows }, (_, i) => []);

    events.available.forEach((event, i) => {
      const row = Math.floor(i / numCols);
      rows[row].push(event);
    });

    const eventRows = rows.map((row, i) => (
      <Row key={i} className="justify-content-center">
        {row.map((event, j) => (
          <Col key={j} sm={12} md={6} lg={3} className="my-2">
            <EventCards
              prop={event}
              accepted={events.accepted.some(
                (x) => x.eventId === event.eventId
              )}
            />
          </Col>
        ))}
      </Row>
    ));
    console.log("event mapping done");
    return eventRows;
  };

  return (
    <>
      {loading ? (
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      ) : (
        <>
          {event ? (
            event
          ) : (
            <p style={{ textAlign: "center" }}>No events available.</p>
          )}
        </>
      )}
    </>
  );
};

export default EventThread;
