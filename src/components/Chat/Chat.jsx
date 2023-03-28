import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import Storage from "../../storage/storage";
import { getMessages, getUserByUsername } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { sendMessage } from "../../api/apiHandler";
import Pointer from "../../utils/mousePointer";
import { Button, Form, Modal } from "react-bootstrap";

// Copied from https://mdbootstrap.com/docs/react/extended/chat/

const fetchData = async () => {
  const data = await getMessages();
  return data;
};

function Chat() {
  const [dmSideBar, setDmSideBar] = useState([]);
  const [dmChat, setDmChat] = useState([]);
  const [current, setCurrent] = useState();
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState();

  useEffect(() => {
    let dmsFromStorage = Storage.getDirectMessages();
    if (dmsFromStorage === null) {
      Pointer.setLoading();
      fetchData().then((messages) => {
        setDmSideBar(mapMessagesSideBar(messages));
        setDmChat(mapMessagesChatBox(messages));
        Storage.setDirectMessages(messages);
        Pointer.setDefault();
      });
    } else {
      setDmSideBar(mapMessagesSideBar(dmsFromStorage));
      setDmChat(mapMessagesChatBox(dmsFromStorage));
    }
  }, [setCurrent, current, setDmSideBar, setDmChat]);

  function showChat(username) {
    setCurrent(username);
  }

  async function refresh() {
    Pointer.setLoading();
    fetchData().then((messages) => {
      setDmSideBar(mapMessagesSideBar(messages));
      setDmChat(mapMessagesChatBox(messages));
      Storage.setDirectMessages(messages);
      Pointer.setDefault();
    });
  }

  async function handleSendMessage(action) {
    if (message) {
      let response = null;
      Pointer.setLoading();
      console.log(newUser);
      if (action === "new-user") {
        const user = await getUserByUsername(newUser);

        if (!user) {
          alert("No user found");
          Pointer.setDefault();
          return;
        }

        response = await sendMessage(message, newUser);
        setShowModal(false);
      } else {
        response = await sendMessage(message, current);
      }

      fetchData().then((messages) => {
        setDmSideBar(mapMessagesSideBar(messages));
        setDmChat(mapMessagesChatBox(messages));
        Storage.setDirectMessages(messages);
        Pointer.setDefault();
        document.getElementById("textArea").value = "";
        setMessage(null);
        setNewUser(null);
      });
    } else {
      Pointer.setDefault();
      alert("Invalid message");
    }
  }

  const handleClose = () => setShowModal(false);

  const mapMessagesSideBar = (messages) => {
    return messages.map((message, i) => {
      return (
        <li
          key={i}
          className="p-2 border-bottom mb-2"
          style={{ backgroundColor: "#eee" }}
        >
          <a
            className="d-flex justify-content-between"
            onClick={() => showChat(message.sender)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-row">
              <img
                src={message.image}
                alt="avatar"
                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                width="60"
              />
              <div className="pt-1">
                <p className="fw-bold mb-0">{message.sender}</p>
                <p className="small text-muted">
                  {message.messages[0].createdBy ===
                  KeyCloakService.GetUserName()
                    ? "You: "
                    : ""}
                  {message.messages[0].body.length > 33
                    ? message.messages[0].body.substring(0, 33) + "..."
                    : message.messages[0].body}
                </p>
              </div>
            </div>
            <div className="pt-1">
              <p className=" text-muted mb-1">
                {message.messages[0].lastUpdate}
              </p>
            </div>
          </a>
        </li>
      );
    });
  };

  const mapMessagesChatBox = (messages) => {
    return messages.map((messageList, i) => {
      if (messageList.sender === current) {
        return messageList.messages.map((message) => {
          if (message.createdBy !== KeyCloakService.GetUserName()) {
            return (
              <li
                key={message.postId}
                className="d-flex justify-content-between mb-4"
              >
                <img
                  src={messageList.image}
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="90"
                />
                <MDBCard className="flex-fill">
                  <MDBCardHeader className="d-flex justify-content-between p-2">
                    <p className="fw-bold ms-1 mb-0">{message.createdBy}</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> {message.lastUpdate}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">{message.body}</p>
                  </MDBCardBody>
                </MDBCard>
              </li>
            );
          } else {
            return (
              <li
                key={message.postId}
                className="d-flex justify-content-between mb-2"
              >
                <MDBCard className="flex-fill">
                  <MDBCardHeader className="d-flex justify-content-between p-2">
                    <p className="fw-bold ms-1 mb-0">{message.createdBy}</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> {message.lastUpdate}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">{message.body}</p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src={Storage.getUser().image}
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="90"
                />
              </li>
            );
          }
        });
      }
    });
  };

  return (
    <>
      <MDBContainer
        fluid
        className="py-3 mt-1"
        style={{ backgroundColor: "#eee", maxWidth: "100%" }}
      >
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <Button
              className="float-end"
              style={{ width: "80px" }}
              onClick={refresh}
            >
              Refresh
            </Button>
            <Button
              className="float-end me-1"
              style={{ width: "170px" }}
              onClick={() => setShowModal(true)}
            >
              Message a new user
            </Button>
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
              Users
            </h5>

            <MDBCard className="mt-4">
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {dmSideBar}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBRow>
              <MDBCol md="6" lg="5" xl="4" className="mb-2 mb-md-0 ">
                <h5 className="font-weight-bold mb-2 text-center text-lg-start">
                  {current}
                </h5>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBTypography
                listUnStyled
                className="scroll"
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  maxHeight: "500px",
                  maxWidth: "1200px",
                  overflowY: "scroll",
                }}
              >
                {dmChat}
              </MDBTypography>
              <MDBTextArea
                className="bg-white mb-3"
                id="textArea"
                style={{ maxWidth: "1200px", height: "80px" }}
                rows={4}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <Button
                className="float-end"
                style={{ width: "100px" }}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send message to new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user"
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleSendMessage("new-user")}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Chat;
