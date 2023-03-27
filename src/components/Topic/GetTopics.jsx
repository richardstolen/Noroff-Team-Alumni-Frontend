import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { getTopics } from "../../api/topicApi";
import KeyCloakService from "../../security/KeyCloakService.ts";
import TopicCards from "./TopicCards";

const fetchData = async () => {
  const data = await getTopics();
  return data;
};

function GetTopics(props) {
  const [loading, setLoading] = useState(true);
  const [topiclist, setTopicList] = useState([]);

  function triggerSidebar() {
    props.trigger();
  }

  useEffect(() => {
    fetchData().then((topics) => {
      if (topics) {
        setTopicList(
          topics.map((topic, i) => {
            return (
              <TopicCards
                prop={topic}
                trigger={triggerSidebar}
                key={i}
              ></TopicCards>
            );
          })
        );
        setLoading(false);
      } else {
        console.error("Error: topics is undefined");
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        </div>
      ) : (
        <div className="centralize-2">
          <Button onClick={() => {}}> click me</Button>
          {topiclist}
        </div>
      )}
    </div>
  );
}
export default GetTopics;

// user = await getUser(KeyCloakService.GetId());
