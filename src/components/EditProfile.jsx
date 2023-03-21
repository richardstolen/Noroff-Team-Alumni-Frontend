// import React, { useState, useEffect } from 'react';
// import { getUsers, getUser, getUserByUsername, editUsername, editUserBio, editUserStatus, editUserFunFact} from "../api/apiHandler";
// import KeyCloakService from "../security/KeyCloakService.ts";

// function EditUserDetail({userid}) {
//     const [user, setUser] = useState(null);
//     const [show, setShow] = useState(false);
//     const [newBio, setNewBio] = useState('');
//     const [newStatus, setNewStatus] = useState('');
//     const [newFunFact, setNewFunFact] = useState('');
  
//     useEffect(() => {
//       async function fetchUser() {
//         const user = await getUser(KeyCloakService.GetId());
//         setUser(user);
//       }
//       fetchUser();
//     }, []);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  
//     const editUserBio = async (newBio) => {
//       await editUserBio(KeyCloakService.GetId(), newBio);
//       const updatedUser = await getUser(KeyCloakService.GetId());
//       setUser(updatedUser);
//     };
  
//     const editUserStatus = async (newStatus) => {
//       await editUserStatus(KeyCloakService.GetId(), newStatus);
//       const updatedUser = await getUser(KeyCloakService.GetId());
//       setUser(updatedUser);
//     };

//     const editUserFunFact = async (newFunFact) => {
//       await editUserFunFact(KeyCloakService.GetId(), newFunFact);
//       const updatedUser = await getUser(KeyCloakService.GetId());
//       setUser(updatedUser);


//     };
  
//     return (
//       <>
//         {/* {user?.id === userid && ( */}
//           <div className="flex justify-center mt-4">
//             <>
//               <button onClick={() => editUsername("new username")} className="material-symbols-outlined">
//                 Edit Username
//               </button>
//               <button onClick={() => editUserBio("new bio")} className="material-symbols-outlined">
//                 Edit Bio
//               </button>
//               <button onClick={() => editUserStatus("new status")} className="material-symbols-outlined">
//                 Edit Status
//               </button>
//               <button onClick={() => editUserFunFact("new funfact")} className="material-symbols-outlined">
//                 Edit Funfact
//               </button>
//             </>
//           </div>
          
//         {user && (
//         <div className="text-center text-muted mb-4">
//           <img src={user.image} alt="Profile" className="rounded-circle mb-4" style={{ width: '200px', height: '200px' }} />
//           <h2 className="text-dark mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{user.userName}</h2>
//           <h3 className="mb-4" style={{ color: '#666', fontStyle: 'italic' }}>{user.status}</h3>
//           <h4 className="mb-4" style={{ lineHeight: '1.5' }}>{user.bio}</h4>
//           <h4 className="mb-4" style={{ color: '#666' }}>{user.funFact}</h4>
//         </div>
//       )}
//       </>
//     );
//   }

// export default EditUserDetail; 