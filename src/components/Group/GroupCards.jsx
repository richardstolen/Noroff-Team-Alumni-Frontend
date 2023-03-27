import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getUser, joinGroup } from "../../api/apiHandler";
import Storage from "../../storage/storage";
import { useEffect, useState } from "react";
import GroupAPI from "../../api/groupApi";
import KeyCloakService from "../../security/KeyCloakService.ts";
import Pointer from "../../utils/mousePointer";

const fetchData = async () => {
  const data = await getUser(KeyCloakService.GetId());
  return data;
};

function GroupCards(group) {
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

  const handleJoinGroup = async () => {
    Pointer.setLoading();
    const result = await joinGroup(group.prop.groupId).then(
      (response) => response
    );

    if (result.ok) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
        Pointer.setDefault();
      });
    }
  };

  const handleLeaveGroup = async () => {
    Pointer.setLoading();
    try {
      const result = await GroupAPI.leaveGroup(group.prop.groupId).then(
        (response) => response
      );

      if (result.ok) {
        fetchData().then((user) => {
          setUser(user);
          Storage.setUser(user);
          Pointer.setDefault();
        });
      }
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
export default GroupCards;
