import Navbar1 from '../components/Navbar/Navbar1';
import Sidebar from '../components/Sidebar/Sidebar';
import CalendarSidebar from '../components/Sidebar/CalendarSidebar';
import EventThread from '../components/Event/EventForm';
import CreateEventButton from '../components/Event/EventButton';


const EventList = () => {
  return (
    <>
    <Navbar1/>
    <CalendarSidebar/>
    <Sidebar/>
    <CreateEventButton/>
    <EventThread/>
    
   
    
  
    </>
  );
}

export default EventList; 