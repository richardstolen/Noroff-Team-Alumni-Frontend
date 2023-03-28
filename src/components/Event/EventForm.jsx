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
    // fetchData().then((event) => {
    //   setEvent(mapEvents(event));
    //   Storage.setEvent(event);
    // });
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
    return events.map((event, i) => {
      if (acceptedEvents.some((x) => x.eventId === event.eventId)) {
        return (
          <EventCards
            prop={event}
            accepted={true}
            key={i}
            style={{ textAlign: "center" }}
          >
            {event.description}
          </EventCards>
        );
      } else {
        return (
          <EventCards
            prop={event}
            accepted={false}
            key={i}
            style={{ textAlign: "center" }}
          >
            {event.description}
          </EventCards>
        );
      }
    });
  };

  return (
    <>
      {event ? (
        event
      ) : (
        <PulseLoader className="spinning-wheel" color="#0d6efd" />
      )}
    </>
  );
};

export default EventThread;
