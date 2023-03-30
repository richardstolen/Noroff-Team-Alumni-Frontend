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
import { formatEventDate } from "../../utils/dateFormat";
import { TriggerContext } from "../../contexts/triggerContext";
import { useContext } from "react";

const fetchData = async () => {
  let user = await getUser(KeyCloakService.GetId());
  return user;
};

function EventCards(event) {
  const [user, setUser] = useState(Storage.getUser());
  const [trigger, setTrigger, triggerRender] = useContext(TriggerContext);
  useEffect(() => {
    let userFromStorage = Storage.getUser();
    if (!userFromStorage) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
      });
    } else {
      Storage.setUser(userFromStorage);
    }
  }, [user, setUser, trigger]);

  const handleJoinEvent = async () => {
    Pointer.setLoading();
    const result = await joinEvent(event.prop.eventId).then(
      (response) => response
    );

    if (result.ok) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
        triggerRender();
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
          triggerRender();
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      {event?.prop && (
        <Card style={{ width: "18rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Text>{event.prop.title}</Card.Text>
            <Card.Text>{formatEventDate(event.prop.date)}</Card.Text>
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
