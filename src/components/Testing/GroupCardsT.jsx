import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getUser, joinGroup } from "../../api/apiHandler";
import Storage from "../../storage/storage";
import { useEffect, useState } from "react";

function GroupCardsT(group) {
  const [user, setUser] = useState(Storage.getUser());

  useEffect(() => {
    console.log("Loading");
  }, [user, setUser]);
  const handleJoinGroup = async () => {
    try {
      const result = await joinGroup(group.prop.groupId).then(async () => {
        console.log("async ");
        setUser(
          await getUser().then(() => {
            Storage.setUser(user);
          })
        );
      });
      console.log("success", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLeaveGroup = async () => {
    alert("Leave group not implemented");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>{group.prop.name}</Card.Title>
          <Card.Text>{group.prop.description}</Card.Text>
          {!user.groups.some((x) => x.name === group.prop.name) ? (
            <Button
              variant="primary"
              onClick={() => handleJoinGroup(group.prop)}
            >
              Join Group
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleLeaveGroup(group.prop)}
            >
              Leave Group
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
export default GroupCardsT;
