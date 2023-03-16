import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import  {getGroups}  from '../../api/apiHandler';
import KeyCloakService from '../../security/KeyCloakService.ts';

function GetGroupsT() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const data = await getGroups()
        setLoading(false);
        console.log(data);
        setGroups(data.groups);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGroups();
  }, []);

  return (
    <div>
        {loading ? (
        <div>
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        </div>
      ):(
      <ul>
        {groups.map(group => {
        return(  <li key={group.groupId}>
            <p>{group.name}</p>
            <p>{group.description}</p>
          </li> )}
        )}
      </ul>
      )}
    </div>
  );
}
export default GetGroupsT;


// user = await getUser(KeyCloakService.GetId());