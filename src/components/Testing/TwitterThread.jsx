import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { deletePost, editPost, getPosts } from "../../api/apiHandler";
import Storage from "../../storage/storage";
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";

const fetchData = async () => {
  const data = await getPosts();
  return data;
};

const convertDate = (posts) => {
  posts.map((post) => {
    console.log(post);
  });
};

const TwitterThread = () => {
  const [showReplies, setShowReplies] = useState(-1);
  const [posts, setPosts] = useState([]);

  /* Edit Modal */
  const [postEdit, setPostEdit] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  useEffect(() => {
    let postsFromStorage = Storage.getPosts();
    if (postsFromStorage === null) {
      fetchData().then((posts) => {
        setPosts(mapPost(posts));
        Storage.setPosts(posts);
      });
    } else {
      setPosts(mapPost(postsFromStorage));
    }
  }, [showReplies, setShowReplies, postEdit, setPostEdit, setPosts]);

  /**
   * Function for handling edit post
   */
  async function handleEditPost() {
    // Calling edit post in API with the changed post object
    editPost(postEdit);

    // Calling get posts to refresh page
    fetchData().then((posts) => {
      setPosts(mapPost(posts));
      Storage.setPosts(posts);
    });

    // Closing the modal
    handleCloseEditModal();
  }

  async function handleDeletePost(id) {
    // Delete post
    deletePost(id);

    // Calling get posts to refresh page
    fetchData().then((posts) => {
      setPosts(mapPost(posts));
      Storage.setPosts(posts);
    });

    // Closing the modal
    handleCloseEditModal();
  }

  const mapPost = (posts) => {
    return posts.map((post, i) => {
      return (
        <Container key={i}>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h4>{post.title}</h4>
                  <br />
                  <small>Intended audience: {post.target}</small>
                  <br />
                  <small>
                    Last updated:
                    {post.lastUpdate}
                  </small>
                  <br />
                  <small>Created by: {post.createdBy}</small>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{post.body}</Card.Text>

                  <span>
                    <Image
                      src="Images/comment.png"
                      fluid
                      width={25}
                      style={{ marginRight: "10px" }}
                    />
                    {post.comments.length}
                  </span>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      if (showReplies !== post.postId) {
                        setShowReplies(post.postId);
                      } else {
                        setShowReplies(-1);
                      }
                    }}
                  >
                    {post.comments.length > 0 ? (
                      showReplies === post.postId ? (
                        "Hide replies"
                      ) : (
                        "Show replies"
                      )
                    ) : (
                      <></>
                    )}
                  </Button>

                  {KeyCloakService.GetUserName() === post.createdBy ? (
                    <Button
                      style={{ marginLeft: "1050px" }}
                      onClick={() => {
                        setPostEdit(post);
                        return handleShowEditModal();
                      }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <></>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {showReplies !== post.postId ? (
            <div></div>
          ) : (
            post.comments.map((post, i) => {
              return (
                <Row key={i}>
                  <Col>
                    <Card>
                      <Card.Header>{post.userId}</Card.Header>
                      <Card.Body>
                        <Card.Text>{post.body}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })
          )}
        </Container>
      );
    });
  };

  return (
    <>
      <div>
        {posts ? (
          posts
        ) : (
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        )}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onClick={(e) => {}}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={postEdit.title}
                  onChange={(e) => {
                    postEdit.title = e.target.value;
                    setPostEdit(postEdit);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Post Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={postEdit.body}
                  onChange={(e) => {
                    postEdit.body = e.target.value;
                    setPostEdit(postEdit);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeletePost(postEdit.postId)}
            >
              Delete post
            </Button>
            <Button variant="primary" onClick={handleEditPost}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TwitterThread;
