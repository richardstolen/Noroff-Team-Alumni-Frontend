import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const topics = [
  { name: "Topic 1", description: "This is the first topic" },
  { name: "Topic 2", description: "This is the second topic" },
  { name: "Topic 3", description: "This is the third topic" },
];

function TopicCardsT() {
  return (
    <div style={{ display: "flex", justifyContent: "center"}} className="mt-5">
      {topics.map((topic, index) => (
        <Card key={index} style={{ width: "18rem",margin: '1rem'}}>
          <Card.Body>
            <Card.Title>{topic.name}</Card.Title>
            <Card.Text>{topic.description}</Card.Text>
            <Button variant="primary">Join Topic</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default TopicCardsT;
