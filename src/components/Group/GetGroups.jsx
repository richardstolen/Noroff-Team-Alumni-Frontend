import { useEffect, useState, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { getGroups } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import GroupCards from "./GroupCards";
import { Row, Col } from "react-bootstrap";


const fetchData = async () => {
  const data = await getGroups();
  return data;
};


function GetGroups() {
  const [loading, setLoading] = useState(true);
  const [groupRows, setGroupRows] = useState([]);

  useEffect(() => {
    fetchData().then((groups) => {
      const numGroups = groups.length;
      const numCols = 3; // 3 columns per row
      const numRows = Math.ceil(numGroups / numCols); // Number of rows needed
      const rows = Array.from({ length: numRows }, (_, i) => {
        // Create an empty array for each row
        return [];
      });

      // Add groups to rows
      groups.forEach((group, i) => {
        const row = Math.floor(i / numCols); // Determine which row to add the group to
        rows[row].push(group);
      });

      // Map each row to a Row component with GroupCards components
      const groupRows = rows.map((row, i) => (
        <Row key={i} className="justify-content-center">
          {row.map((group, j) => (
            <Col key={j} sm={12} md={6} lg={3} className="my-2">
              <GroupCards prop={group} />
            </Col>
          ))}
        </Row>
      ));

      setGroupRows(groupRows);
      setLoading(false);
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