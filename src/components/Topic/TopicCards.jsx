import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getUser} from "../../api/apiHandler";
import Storage from "../../storage/storage";
import { useEffect, useState } from "react";
import {joinTopic }from "../../api/topicApi";
import TopicAPI from "../../api/topicApi";
import KeyCloakService from "../../security/KeyCloakService.ts";

const fetchData = async () => {
  const data = await getUser(KeyCloakService.GetId());
  return data;
};

function TopicCards(topic) {
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

  const handleJoinTopic = async () => {
    const result = await joinTopic(topic.prop.topicId).then(
      (response) => response
    );

    if (result.ok) {
      fetchData().then((user) => {
        setUser(user);
        Storage.setUser(user);
      });
    }
  };

  const handleLeaveTopic = async () => {
    try {
      const result = await TopicAPI.leaveTopic(topic.prop.topicId).then(
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
      {topic?.prop && (
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>{topic.prop.name}</Card.Title>
          <Card.Text>{topic.prop.description}</Card.Text>
          {!user.topics.some((x) => x.name === topic.prop.name) ? (
            <Button
              variant="primary"
              onClick={() => handleJoinTopic(topic.prop)}
            >
              Join Topic
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleLeaveTopic(topic.prop)}
            >
              Leave Topic
            </Button>
          )}
        </Card.Body>
      </Card>
      )}
    </div>
  );
}
export default TopicCards;
