import Navbar1 from "../components/Navbar/Navbar1";
import GroupCardsT from "../components/Testing/GroupCardsT";
import GetGroupsT from "../components/Testing/GetGroupsT";
import Sidebar from "../components/Sidebar/Sidebar";
import GroupButton from "../components/Group/GroupButton";

const GroupList = () => {
  return (
    <>
      <Navbar1 />
      <Sidebar />
      <GroupButton/>
      <GetGroupsT />
      
    </>
  );
};

export default GroupList;
