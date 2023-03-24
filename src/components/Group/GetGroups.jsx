import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getGroups } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import GroupCards from "./GroupCards";


const fetchData = async () => {
  const data = await getGroups();
  return data;
};

function GetGroups() {
  const [loading, setLoading] = useState(true);
  const [grouplist, setGroupList] = useState([]);

  useEffect(() => {
    fetchData().then((groups) => {
      setGroupList(
        groups.map((group, i) => {
          return <GroupCards 
          prop={group} 
          key={i}>

          </GroupCards>;
        })
      );
      setLoading(false);
    });
  }, []);

  

  return (
    <div>
      {loading ? (
        <div>
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        </div>
      ) : (
        <div className="centralize-2">{grouplist}</div>
      )}
    </div>
  );
}
export default GetGroups;

// user = await getUser(KeyCloakService.GetId());
