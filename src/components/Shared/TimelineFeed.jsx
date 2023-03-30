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
  createPost,
  deletePost,
  editPost,
  getPosts,
} from "../../api/apiHandler";
import { PulseLoader } from "react-spinners";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { useParams } from "react-router";
import Pointer from "../../utils/mousePointer";
import CreateEventButton from "../Event/EventButton";

const TimelineFeed = ({ onChange, postsFromParent }) => {
  const [showReplies, setShowReplies] = useState(-1);
  const [posts, setPosts] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const { id } = useParams();
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
    Pointer.setLoading();
    if (action === "delete") {
      await deletePost(postEdit);
    } else if (createMode) {
      if (window.location.pathname.slice(0, 13) === "/group-detail") {
        await createPost(postEdit, id, "group");
      } else if (window.location.pathname.slice(0, 13) === "/topic-detail") {
        await createPost(postEdit, id, "topic");
      }
    } else if (editMode && !createMode) {
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
    Pointer.setLoading();
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
                            setCreateMode(false);
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
                      src="../Images/comment.png"
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
                      setCreateMode(false);
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
                                  setCreateMode(false);
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
        {[
          "http://localhost:3000/timeline",
          "http://localhost:3000/Timeline",
          "http://localhost:3000/",
          "https://team-alumni.vercel.app/",
          "https://team-alumni.vercel.app/timeline",
          "https://team-alumni.vercel.app/Timeline",
        ].includes(window.location.href) ? (
          <></>
        ) : (
          <CreateEventButton
            url={window.location.pathname.slice(0, 13)}
            id={id}
          />
        )}

        <Row
          className="mt-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {[
            "http://localhost:3000/timeline",
            "http://localhost:3000/Timeline",
            "http://localhost:3000/",
            "https://team-alumni.vercel.app/",
            "https://team-alumni.vercel.app/timeline",
            "https://team-alumni.vercel.app/Timeline",
          ].includes(window.location.href) ? (
            <></>
          ) : (
            <Button
              className="me-5"
              style={{ width: "120px" }}
              onClick={() => {
                setCreateMode(true);
                setEditCommentMode(false);
                setEditMode(true);
                return handleShowModal();
              }}
            >
              New Post
            </Button>
          )}

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
              {createMode ? (
                <span>Create post</span>
              ) : editMode ? (
                <span>Edit post</span>
              ) : (
                <span>Comment</span>
              )}
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
                      placeholder={!createMode ? postEdit.title : ""}
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
                    !createMode
                      ? editCommentMode === false
                        ? postEdit.body
                        : "Comment"
                      : ""
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
            {editMode && !createMode ? (
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
              <></>
            )}

            {!editMode ? (
              <Button variant="primary" onClick={(e) => handlePost(e)}>
                Comment
              </Button>
            ) : (
              <></>
            )}

            {createMode && !editCommentMode ? (
              <>
                <Button variant="primary" onClick={handlePost}>
                  Create
                </Button>
              </>
            ) : (
              <></>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TimelineFeed;
