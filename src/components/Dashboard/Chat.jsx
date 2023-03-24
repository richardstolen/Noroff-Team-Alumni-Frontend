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
import { getMessages } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import { sendMessage } from "../../api/apiHandler";

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

  useEffect(() => {
    let dmsFromStorage = Storage.getDirectMessages();
    if (dmsFromStorage === null) {
      fetchData().then((messages) => {
        setDmSideBar(mapMessagesSideBar(messages));
        setDmChat(mapMessagesChatBox(messages));
        Storage.setDirectMessages(messages);
      });
    } else {
      setDmSideBar(mapMessagesSideBar(dmsFromStorage));
      setDmChat(mapMessagesChatBox(dmsFromStorage));
    }
  }, [setCurrent, current, setDmSideBar, setDmChat]);

  function showChat(username) {
    setCurrent(username);
  }

  async function handleSendMessage() {
    if (message) {
      document.body.style.cursor = "wait";
      const response = await sendMessage(message, current);

      fetchData().then((messages) => {
        setDmSideBar(mapMessagesSideBar(messages));
        setDmChat(mapMessagesChatBox(messages));
        Storage.setDirectMessages(messages);
        document.body.style.cursor = "default";
        document.getElementById("textArea").value = "";
        setMessage(null);
      });
    } else {
      alert("Invalid message");
    }
  }

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
                <p className="small text-muted">{message.messages[0].body}</p>
              </div>
            </div>
            <div className="pt-1">
              <p className="small text-muted mb-1">
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
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.createdBy}</p>
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
                className="d-flex justify-content-between mb-4"
              >
                <MDBCard className="w-100">
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.createdBy}</p>
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
      ¨
      <MDBContainer
        fluid
        className="py-5"
        style={{ backgroundColor: "#eee", width: "60%" }}
      >
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
              Member
            </h5>

            <MDBCard>
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {dmSideBar}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBRow>
              <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                <h5 className="font-weight-bold mb-3 text-center text-lg-start">
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
                  overflowY: "scroll",
                }}
              >
                {dmChat}
              </MDBTypography>
              <MDBTextArea
                className="bg-white mb-3"
                id="textArea"
                rows={4}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <MDBBtn
                color="info"
                rounded
                className="float-end"
                onClick={handleSendMessage}
              >
                Send
              </MDBBtn>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Chat;

//   return (
//   <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
//     <MDBRow>
//       <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
//         <h5 className="font-weight-bold mb-3 text-center text-lg-start">
//           Member
//         </h5>

//         <MDBCard>
//           <MDBCardBody>
//             <MDBTypography listUnStyled className="mb-0">
// ---------------------------------------------------------------------------------------
//                 <li
//                   className="p-2 border-bottom"
//                   style={{ backgroundColor: "#eee" }}
//                 >
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">John Doe</p>
//                         <p className="small text-muted">
//                           Hello, Are you there?
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">Just now</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2 border-bottom">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Danny Smith</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">5 mins ago</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2 border-bottom">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Alex Steward</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">Yesterday</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2 border-bottom">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Ashley Olsen</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">Yesterday</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2 border-bottom">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Kate Moss</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">Yesterday</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2 border-bottom">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Lara Croft</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">Yesterday</p>
//                     </div>
//                   </a>
//                 </li>
//                 <li className="p-2">
//                   <a href="#!" className="d-flex justify-content-between">
//                     <div className="d-flex flex-row">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                         alt="avatar"
//                         className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                         width="60"
//                       />
//                       <div className="pt-1">
//                         <p className="fw-bold mb-0">Brad Pitt</p>
//                         <p className="small text-muted">
//                           Lorem ipsum dolor sit.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pt-1">
//                       <p className="small text-muted mb-1">5 mins ago</p>
//                       <span className="text-muted float-end">
//                         <MDBIcon fas icon="check" />
//                       </span>
//                     </div>
//                   </a>
//                 </li>
// ---------------------------------------------------------------------------------------
//               </MDBTypography>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         <MDBCol md="6" lg="7" xl="8">
//           <MDBTypography listUnStyled>
// ---------------------------------------------------------------------------------------
//             <li className="d-flex justify-content-between mb-4">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                 alt="avatar"
//                 className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
//                 width="60"
//               />
//               <MDBCard>
//                 <MDBCardHeader className="d-flex justify-content-between p-3">
//                   <p className="fw-bold mb-0">Brad Pitt</p>
//                   <p className="text-muted small mb-0">
//                     <MDBIcon far icon="clock" /> 12 mins ago
//                   </p>
//                 </MDBCardHeader>
//                 <MDBCardBody>
//                   <p className="mb-0">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                     do eiusmod tempor incididunt ut labore et dolore magna
//                     aliqua.
//                   </p>
//                 </MDBCardBody>
//               </MDBCard>
//             </li>
//             <li className="d-flex justify-content-between mb-4">
//               <MDBCard className="w-100">
//                 <MDBCardHeader className="d-flex justify-content-between p-3">
//                   <p className="fw-bold mb-0">Lara Croft</p>
//                   <p className="text-muted small mb-0">
//                     <MDBIcon far icon="clock" /> 13 mins ago
//                   </p>
//                 </MDBCardHeader>
//                 <MDBCardBody>
//                   <p className="mb-0">
//                     Sed ut perspiciatis unde omnis iste natus error sit
//                     voluptatem accusantium doloremque laudantium.
//                   </p>
//                 </MDBCardBody>
//               </MDBCard>
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
//                 alt="avatar"
//                 className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
//                 width="60"
//               />
//             </li>
//             <li className="d-flex justify-content-between mb-4">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                 alt="avatar"
//                 className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
//                 width="60"
//               />
//               <MDBCard>
//                 <MDBCardHeader className="d-flex justify-content-between p-3">
//                   <p className="fw-bold mb-0">Brad Pitt</p>
//                   <p className="text-muted small mb-0">
//                     <MDBIcon far icon="clock" /> 10 mins ago
//                   </p>
//                 </MDBCardHeader>
//                 <MDBCardBody>
//                   <p className="mb-0">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                     do eiusmod tempor incididunt ut labore et dolore magna
//                     aliqua.
//                   </p>
//                 </MDBCardBody>
//               </MDBCard>
//             </li>
//             <li className="bg-white mb-3">
//               <MDBTextArea label="Message" id="textAreaExample" rows={4} />
//             </li>
//             <MDBBtn color="info" rounded className="float-end">
//               Send
//             </MDBBtn>
// ---------------------------------------------------------------------------------------
//           </MDBTypography>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );