import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getGroups } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { Row, Col } from "react-bootstrap";
import GroupCards from "./GroupCards";

const fetchData = async () => {
  const data = await getGroups();
  return data;
};

function displayCardsInColumns(cards) {
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

function GetGroups() {
  const [loading, setLoading] = useState(true);
  const [groupRows, setGroupRows] = useState([]);

  useEffect(() => {
    fetchData().then((groups) => {
      if (groups) {
        const topicCards = groups.map((topic, i) => {
          return <GroupCards prop={topic} key={i} />;
        });
        setGroupRows(displayCardsInColumns(topicCards));
        setLoading(false);
      } else {
        console.error("Error: groups is undefined");
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
        <>
          {groupRows}
        </>
      )}
    </div>
  );
}

export default GetGroups;