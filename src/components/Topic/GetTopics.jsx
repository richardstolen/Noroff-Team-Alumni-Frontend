// import { useEffect, useState } from "react";
// import { PulseLoader } from "react-spinners";
// import { getTopics } from "../../api/topicApi";
// import KeyCloakService from "../../security/KeyCloakService.ts";
// import TopicCards from "./TopicCards";

// const fetchData = async () => {
//   const data = await getTopics();
//   return data;
// };

// function GetTopics() {
//   const [loading, setLoading] = useState(true);
//   const [topiclist, setTopicList] = useState([]);

//   useEffect(() => {
//     fetchData().then((topics) => {
//       if (topics) {
//         setTopicList(
//           topics.map((topic, i) => {
//             return (
//               <TopicCards prop={topic} key={i}>
//               </TopicCards>
//             );
//           })
//         );
//         setLoading(false);
//       } else {
//         console.error('Error: topics is undefined');
//       }
//     });
//   }, []);
  

//   return (
//     <div>
//       {loading ? (
//         <div>
//           <PulseLoader className="spinning-wheel" color="#0d6efd" />
//         </div>
//       ) : (
//         <div className="centralize-2">{topiclist}</div>
//       )}
//     </div>
//   );
// }
// export default GetTopics;

// // user = await getUser(KeyCloakService.GetId());

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getTopics } from "../../api/topicApi";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { Row, Col } from "react-bootstrap";
import TopicCards from "./TopicCards";

const fetchData = async () => {
  const data = await getTopics();
  return data;
};

function displayGroupCardsInColumns(cards) {
  const numCols = 3;
  const numRows = Math.ceil(cards.length / numCols);
  const rows = Array.from({ length: numRows }, (_, i) => []);

  cards.forEach((card, i) => {
    const row = Math.floor(i / numCols);
    rows[row].push(card);
  });

  const groupRows = rows.map((row, i) => (
    <Row key={i} className="justify-content-center">
      {row.map((card, j) => (
        <Col key={j} sm={12} md={6} lg={4} className="my-2">
          {card}
        </Col>
      ))}
    </Row>
  ));

  return groupRows;
}

function GetTopics() {
  const [loading, setLoading] = useState(true);
  const [topiclist, setTopicList] = useState([]);

  useEffect(() => {
    fetchData().then((topics) => {
      if (topics) {
        const topicCards = topics.map((topic, i) => {
          return <TopicCards prop={topic} key={i}></TopicCards>;
        });
        setTopicList(displayGroupCardsInColumns(topicCards));
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
        <div className="centralize-2">{topiclist}</div>
      )}
    </div>
  );
}
export default GetTopics;