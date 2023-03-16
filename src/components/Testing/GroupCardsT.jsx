import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const groups = [
  { name: "Group 1", description: "This is the first group" },
  { name: "Group 2", description: "This is the second group" },
  { name: "Group 3", description: "This is the third group" },
];

function GroupCardsT() {
  return (
    <div style={{ display: "flex", justifyContent: "center"}} className="mt-5">
      {groups.map((group, index) => (
        <Card key={index} style={{ width: "18rem",margin: '1rem'}}>
          <Card.Body>
            <Card.Title>{group.Name}</Card.Title>
            <Card.Text>{group.Description}</Card.Text>
            <Button variant="primary">Join Group</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default GroupCardsT;
