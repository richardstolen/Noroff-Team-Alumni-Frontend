import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function GroupCardsT(group) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>{group.prop.name}</Card.Title>
          <Card.Text>{group.prop.description}</Card.Text>
          <Button variant="primary">Join Group</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default GroupCardsT;
