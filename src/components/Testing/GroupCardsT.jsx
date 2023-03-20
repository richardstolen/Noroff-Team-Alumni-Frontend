import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { joinGroup } from "../../api/apiHandler";

function GroupCardsT(group) {
  const handleJoinGroup = async () => {
    try {
      const result = await joinGroup(group.prop.groupId);
      console.log("success", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>{group.prop.name}</Card.Title>
          <Card.Text>{group.prop.description}</Card.Text>
          <Button variant="primary" onClick={() => handleJoinGroup(group.prop)}>
            Join Group
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default GroupCardsT;
