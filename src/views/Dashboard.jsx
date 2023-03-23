import Chat from "../components/Dashboard/Chat";
import NavBar1 from "../components/Navbar/Navbar1";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";

const Dashboard = () => {
  return (
    <>
      <NavBar1 />
      <Chat />
      <CalendarSidebar />
      {/* <h1 className="center-h1">A dashboard for Marcus Rashford.</h1> */}
    </>
  );
};

export default Dashboard;
