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
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";

const TimelineFeed = ({ onChange, postsFromParent }) => {
  const [showReplies, setShowReplies] = useState(-1);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [editCommentMode, setEditCommentMode] = useState(false);

  const [search, setSearch] = useState("");
  /* Edit Modal */
  const [postEdit, setPostEdit] = useState({});
  const [showEditModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (postsFromParent) {
      setPosts(mapPost(postsFromParent));
    }
  }, [showReplies, setShowReplies, search, postsFromParent]);

  /**
   * Function for handling edit post
   */
  async function handlePost(action) {
    document.body.style.cursor = "wait";
    if (action === "delete") {
      await deletePost(postEdit);
    } else if (editMode) {
      // Calling edit post in API with the changed post object
      await editPost(postEdit);
    } else {
      // IF not edit mode => comment
      await commentPost(postEdit);
    }

    // Set on change to true, which triggers the parent component
    onChange(true);

    // Closing the modal
    handleCloseModal();
  }

  async function refreshPage() {
    document.body.style.cursor = "wait";
    onChange(true);
  }

  const mapPost = (posts) => {
    if (search !== "") {
      posts = posts.filter((post) => {
        return (
          post.body.toLowerCase().match(search.toLowerCase()) ||
          post.title.toLowerCase().match(search.toLowerCase()) ||
          post.createdBy.toLowerCase().match(search.toLowerCase()) ||
          post.target.toLowerCase().match(search.toLowerCase())
        );
      });
    }
    return posts.map((post, i) => {
      return (
        <Container key={i} className=" p-3">
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Row>
                    <Col xs={2} className="d-flex align-items-center">
                      <img
                        src={post.image}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="80"
                      />
                    </Col>
                    <Col>
                      <h5>{post.title}</h5>
                      <small>Intended audience: {post.target}</small>
                      <br />
                      <small>{post.createdBy}</small>
                      <br />
                      <small>{post.lastUpdate}</small>
                    </Col>

                    <Col xs={2} className="d-flex align-items-center">
                      {/**
                       * Edit button
                       */}
                      {KeyCloakService.GetUserName() === post.createdBy ? (
                        <Button
                          className="mt-2"
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
                    </Col>
                  </Row>
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

                  {/**
                   * Hide/show replies
                   */}
                  <Button
                    variant="link"
                    className="mt-2 me-2"
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
                    className="mt-2"
                    onClick={() => {
                      setEditMode(false);
                      setEditCommentMode(true);
                      setPostEdit(post);
                      return handleShowModal();
                    }}
                  >
                    Comment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {showReplies !== post.postId ? (
            <div></div>
          ) : (
            post.comments.map((post, i) => {
              return (
                <Row key={i} className="mt-2">
                  <Col md={{ span: 10, offset: 2 }}>
                    <Card>
                      <Card.Header>
                        <Row>
                          <Col xs={2} className="d-flex align-items-center">
                            <img
                              src={post.image}
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                          </Col>
                          <Col>
                            <h5>{post.createdBy}</h5>
                            <small>{post.lastUpdate}</small>
                          </Col>
                          <Col xs={2} className="d-flex align-items-center">
                            {/**
                             * Edit button
                             */}
                            {KeyCloakService.GetUserName() ===
                            post.createdBy ? (
                              <Button
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
                          </Col>
                        </Row>
                      </Card.Header>
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
      <Container>
        <Row
          className="pb-2"
          style={{ display: "flex", justifyContent: "center" }}
        ></Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Form.Control
            style={{ width: "60%" }}
            className="w-40"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            className="ms-5"
            style={{ width: "120px" }}
            onClick={refreshPage}
          >
            Refresh Feed
          </Button>
        </Row>
      </Container>

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

export default TimelineFeed;
