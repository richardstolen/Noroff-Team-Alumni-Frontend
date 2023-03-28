import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  getAcceptedEventByUser,
  getEventByUser,
  joinEvent,
} from "../../api/eventApi";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getUser } from "../../api/apiHandler";
import { useEffect, useState } from "react";
import EventAPI from "../../api/eventApi";
import Storage from "../../storage/storage";
import Pointer from "../../utils/mousePointer";

const fetchData = async () => {
  let user = await getUser(KeyCloakService.GetId());
  return user;
};

function EventCards(event) {
  const [user, setUser] = useState(Storage.getUser());

  useEffect(() => {}, []);

  const handleJoinEvent = async () => {
    Pointer.setLoading();
    const result = await joinEvent(event.prop.eventId).then(
      (response) => response
    );

    if (result.ok) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
        Pointer.setDefault();
      });
    }
  };

  const handleLeaveEvent = async () => {
    Pointer.setLoading();
    try {
      const result = await EventAPI.leaveEvent(event.prop.eventId).then(
        (response) => response
      );

      if (result.ok) {
        fetchData().then((user) => {
          setUser(user);
          Storage.setUser(user);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    Pointer.setDefault();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      {event?.prop && (
        <Card style={{ width: "18rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Text>{event.prop.title}</Card.Text>
            <Card.Text>{event.prop.description}</Card.Text>
            {!event.accepted ? (
              <Button
                variant="primary"
                onClick={() => handleJoinEvent(event.prop)}
              >
                Join event
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleLeaveEvent(event.prop)}
              >
                Leave event
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
export default EventCards;
