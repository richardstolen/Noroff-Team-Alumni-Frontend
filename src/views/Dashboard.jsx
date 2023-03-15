import NavBar1 from "../components/Navbar/Navbar1";
import CalendarSidebar from "../components/Sidebar/CalendarSidebar";
import ChatboxT from "../components/Testing/ChatboxT";



const Dashboard = () => {
    return(
        
        <>
        <NavBar1/>
        <CalendarSidebar/>
        <ChatboxT/>
        {/* <h1 className="center-h1">A dashboard for Marcus Rashford.</h1> */}
        </>
        
    );
}

export default Dashboard;