import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getEventByUser, joinEvent } from "../../api/eventApi";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { getUser} from "../../api/apiHandler";
import { useEffect, useState } from "react";
import EventAPI from "../../api/eventApi";
import Storage from "../../storage/storage";




const fetchData = async () => {
  const data = await getUser(KeyCloakService.GetId());
  const allEvent = await getEventByUser();
  const userWithEvents = {
    ...data,
    events: allEvent
  };
  return userWithEvents;
};

function EventCards(event) {
  const [user, setUser] = useState(Storage.getUser());

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
  }, [user, setUser]);

  const handleJoinEvent = async () => {
    const result = await joinEvent(event.prop.eventId).then(
      (response) => response
    );

    

    if (result.ok) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
      });
    }
  };



  const handleLeaveEvent = async () => {
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
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      {event?.prop&& (
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Text>{event.prop.description}</Card.Text>
          {console.log(user)}
          {!user.events.some((x) => x.eventId === event.prop.eventId) ? (
          <Button variant="primary" onClick={() => handleJoinEvent(event.prop)}>
            Join event
          </Button>
          ) : (
            <Button variant="primary" onClick={() => handleLeaveEvent(event.prop)}>
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