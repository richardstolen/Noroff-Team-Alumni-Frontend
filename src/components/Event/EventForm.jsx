import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const event = [
  { name: "Event 1", description: "This is the first event" },
  { name: "Event 2", description: "This is the second event" },
  { name: "Event 3", description: "This is the third event," },

];

function EventCardsT() {
  return (
    <div style={{ display: "flex", justifyContent: "center"}} className="mt-5">
      {event.map((event, index) => (
        <Card key={index} style={{ width: "18rem",margin: '1rem'}}>
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Button variant="primary">Join Event</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default EventCardsT;