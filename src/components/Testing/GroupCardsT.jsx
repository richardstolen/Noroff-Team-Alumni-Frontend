import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { joinGroup } from "../../api/apiHandler";




function GroupCardsT(group) {
  console.log(group.prop);
  const handleJoinGroup = () => {
    joinGroup(group.prop.id).then(()=>{
      //do something
      console.log("Congratulations, you are now a member.");
    });
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>{group.prop.name}</Card.Title>
          <Card.Text>{group.prop.description}</Card.Text>
          <Button variant="primary" onClick={handleJoinGroup}>Join Group</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default GroupCardsT;
