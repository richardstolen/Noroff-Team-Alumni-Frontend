import Navbar1 from '../components/Navbar/Navbar1';
import Sidebar from '../components/Sidebar/Sidebar';
import GetTopics from '../components/Topic/GetTopics';
import TopicButton from '../components/Topic/TopicButton';



const TopicList = () => {
  return (
    <>
    <Navbar1/>
    <Sidebar/>
    <TopicButton/>
    <GetTopics/>
  
    </>
  );
}

export default TopicList;