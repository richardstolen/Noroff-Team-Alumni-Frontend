import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Storage from "../../storage/storage";

const TwitterThread = () => {
  const [showReplies, setShowReplies] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      setPosts(Storage.getPosts());
    }
    fetchData();
  }, []);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  let postlist = [];
  if (posts) {
    postlist = posts.map((post, i) => {
      return (
        <Container key={i}>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h4>{post.title}</h4>
                  <br />
                  <small>Intended audience: </small>
                  <br />
                  <small>Last updated: {post.lastUpdate}</small>
                  <br />
                  <small>Created by: {post.userId}</small>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{post.body}</Card.Text>
                  <Image src="coffee.jpg" fluid />
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={toggleReplies}
                  >
                    {showReplies ? "Hide replies" : "Show replies"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {showReplies && replies}
        </Container>
      );
    });
  }

  const replies = (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>Jane Smith (@janesmith)</Card.Header>
            <Card.Body>
              <Card.Text>
                I agree, John! Where did you get that coffee? 🔍
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>John Doe (@johndoe)</Card.Header>
            <Card.Body>
              <Card.Text>
                @janesmith I got it at the new coffee shop on Main St. 😊
              </Card.Text>
              <Image src="coffeeshop.jpg" fluid />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <div>{postlist ? postlist : "Loading"}</div>
    </>
  );
};

export default TwitterThread;
