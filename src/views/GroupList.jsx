import Navbar1 from "../components/Navbar/Navbar1";
import GetGroups from "../components/Group/GetGroups";
import Sidebar from "../components/Sidebar/Sidebar";
import GroupButton from "../components/Group/GroupButton";

const GroupList = () => {
  return (
    <>
      <Navbar1 />
      <Sidebar />
      <GroupButton/>
      <GetGroups />
      
    </>
  );
};

export default GroupList;
