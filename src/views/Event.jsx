import Navbar1 from '../components/Navbar/Navbar1';
import Sidebar from '../components/Sidebar/Sidebar';
import CalendarSidebar from '../components/Sidebar/CalendarSidebar';
import EventThread from '../components/Event/EventForm';



const EventList = () => {
  return (
    <>
    <Navbar1/>
    <CalendarSidebar/>
    <Sidebar/>
    <EventThread/>
  
    </>
  );
}

export default EventList; 