import React, { useState, useEffect } from "react";
import UserGroups from "../Group/UserGroups";
import { getUser } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";


const UserProfileT = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(userId);
    async function fetchData() {
      const user = await getUser(KeyCloakService.GetId()); // call the getUser function with the userId prop
      setUser(user);
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="main-content d-flex justify-content-center " >
        {user ? (
          <>
            <UserGroups groups={user.groups} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileT;
