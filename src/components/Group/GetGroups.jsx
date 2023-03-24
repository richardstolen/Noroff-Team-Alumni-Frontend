import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getGroups } from "../../api/apiHandler";
import KeyCloakService from "../../security/KeyCloakService.ts";
import GroupCardsT from "./GroupCards";


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
          return <GroupCardsT 
          prop={group} 
          key={i}>

          </GroupCardsT>;
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
        <div className="groupList">{grouplist}</div>
      )}
    </div>
  );
}
export default GetGroups;

// user = await getUser(KeyCloakService.GetId());
