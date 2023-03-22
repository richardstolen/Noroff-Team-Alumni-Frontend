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
import {
  commentPost,
  deletePost,
  editPost,
  getPosts,
} from "../../api/apiHandler";
import Storage from "../../storage/storage";
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";

const fetchData = async () => {
  const data = await getPosts();
  return data;
};

const TwitterThread = () => {
  const [showReplies, setShowReplies] = useState(-1);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [editCommentMode, setEditCommentMode] = useState(false);

  /* Edit Modal */
  const [postEdit, setPostEdit] = useState({});
  const [showEditModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
  async function handlePost(action) {
    document.body.style.cursor = "wait";
    if (action === "delete") {
      deletePost(postEdit);
    } else if (editMode) {
      // Calling edit post in API with the changed post object
      editPost(postEdit);
    } else {
      // IF not edit mode => comment
      commentPost(postEdit);
    }

    // Calling get posts to refresh page
    fetchData().then((posts) => {
      setPosts(mapPost(posts));
      Storage.setPosts(posts);
      document.body.style.cursor = "default";
    });

    // Closing the modal
    handleCloseModal();
  }

  async function refreshPage() {
    document.body.style.cursor = "wait";
    // Calling get posts to refresh page
    fetchData().then((posts) => {
      setPosts(mapPost(posts));
      Storage.setPosts(posts);
      document.body.style.cursor = "default";
    });
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

                  {/**
                   * Comment Button
                   */}
                  <Button
                    style={{ marginLeft: "500px" }}
                    onClick={() => {
                      setEditMode(false);
                      setEditCommentMode(true);
                      setPostEdit(post);
                      return handleShowModal();
                    }}
                  >
                    Comment
                  </Button>

                  {/**
                   * Edit button
                   */}
                  {KeyCloakService.GetUserName() === post.createdBy ? (
                    <Button
                      style={{ marginLeft: "1050px" }}
                      onClick={() => {
                        setEditMode(true);
                        setPostEdit(post);
                        setEditCommentMode(false);
                        return handleShowModal();
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
                    <Card style={{ width: "1196px", marginLeft: "100px" }}>
                      <Card.Header>
                        <h6>{post.title}</h6>
                        <small>
                          Last updated:
                          {post.lastUpdate}
                        </small>
                        <br />
                        <small>Created by: {post.createdBy}</small>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>{post.body}</Card.Text>
                        {/**
                         * Edit button
                         */}
                        {KeyCloakService.GetUserName() === post.createdBy ? (
                          <Button
                            style={{ marginLeft: "1050px" }}
                            onClick={() => {
                              setEditMode(true);
                              setEditCommentMode(true);
                              setPostEdit(post);
                              return handleShowModal();
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
              );
            })
          )}
        </Container>
      );
    });
  };

  return (
    <>
      <Button
        style={{
          marginLeft: "400px",
        }}
        onClick={refreshPage}
      >
        Refresh Timeline
      </Button>
      <div>
        {posts ? (
          posts
        ) : (
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        )}
        <Modal show={showEditModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? <span>Edit post</span> : <span>Comment</span>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onClick={(e) => {}}>
              {editMode ? (
                editCommentMode === false ? (
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
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              <Form.Group>
                <Form.Label>Post Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    editCommentMode === false ? postEdit.body : "Comment"
                  }
                  onChange={(e) => {
                    postEdit.body = e.target.value;
                    setPostEdit(postEdit);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {editMode ? (
              <>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    handlePost("delete");
                  }}
                >
                  Delete post
                </Button>
                <Button variant="primary" onClick={handlePost}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={(e) => handlePost(e)}>
                  Comment
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TwitterThread;
