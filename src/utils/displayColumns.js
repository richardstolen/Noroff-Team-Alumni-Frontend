import { Row, Col } from "react-bootstrap";
import GroupCards from "../components/Group/GroupCards";

// Function to display cards into three columns 
function displayGroupCardsInColumns(data) {
    if (!data) {
        return null;
    }

    const numCols = 3;
    const numRows = Math.ceil(data.length / numCols);
    const rows = Array.from({ length: numRows }, (_, i) => []);

    data.forEach((group, i) => {
        const row = Math.floor(i / numCols);
        rows[row].push(group);
    });

    const groupRows = rows.map((row, i) => (
        <Row key={i} className="justify-content-center">
            {row.map((group, j) => (
                <Col key={j} sm={12} md={6} lg={3} className="my-2">
                    <GroupCards prop={group} />
                </Col>
            ))}
        </Row>
    ));

    return groupRows;
}

export default displayGroupCardsInColumns; 