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
  const [availableEvents, setAvailableEvents] = useState();
  const [acceptedEvents, setAcceptedEvents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchEvents().then((events) => {
        setAvailableEvents(events.available);
        setAcceptedEvents(events.accepted);

        setLoading(false);

        Storage.setEvent(event);
      });
    }

    if (loading == false) {
      setEvent(mapEvents(availableEvents));
    }
  }, [loading, setEvent, setAvailableEvents, setAcceptedEvents]);

  const mapEvents = (events) => {
    if (!events) {
      return null;
    }

    const numCols = 3;
    const numRows = Math.ceil(events.length / numCols);
    const rows = Array.from({ length: numRows }, (_, i) => []);

    events.forEach((event, i) => {
      const row = Math.floor(i / numCols);
      rows[row].push(event);
    });

    const eventRows = rows.map((row, i) => (
      <Row key={i} className="justify-content-center">
        {row.map((event, j) => (
          <Col key={j} sm={12} md={6} lg={3} className="my-2">
            <EventCards prop={event} accepted={acceptedEvents.some((x) => x.eventId === event.eventId)} />
          </Col>
        ))}
      </Row>
    ));

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