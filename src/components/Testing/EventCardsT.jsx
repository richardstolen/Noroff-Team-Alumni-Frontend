import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { joinEvent } from "../../api/eventApi";
import { getEventbyId, getEventByUser, createEvent } from "../../api/eventApi";

function EventCards(event) {
  const handleJoinEvent = async () => {
    try {
      const result = await joinEvent(event.prop.eventId);
      console.log("success", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          {/* <Card.Text>{event.prop.title}</Card.Text> */}
          <Card.Text>{event.prop.description}</Card.Text>
          <Button variant="primary" onClick={() => handleJoinEvent(event.prop.description)}>
            Leave event
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default EventCards;