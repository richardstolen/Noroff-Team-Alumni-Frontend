import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./views/Timeline";
import KeyCloakService from "./security/KeyCloakService.ts";
import Profile from "./views/Profile";
import { useEffect, useState } from "react";
import { getUser, createUser, getPosts } from "./api/apiHandler";
import Storage from "./storage/storage";
import { PulseLoader } from "react-spinners";
import GroupList from "./views/GroupList";
import TopicList from "./views/TopicList";
import Navbar1 from "./components/Navbar/Navbar1";
import EventList from "./views/Event";
import GroupDetail from "./views/GroupDetail";
import TopicDetail from "./views/TopicDetail";
import CalendarView from "./views/Calendar";
import Chatbox from "./views/Chatbox";
import TriggerProvider from "./contexts/triggerContext";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const storageUser = Storage.getUser();
      if (storageUser) {
        setLoading(false);
      }
      if (!storageUser) {
        let user = await getUser(KeyCloakService.GetId());
        if (user == null) {
          user = await createUser();
          console.log(user);
          Storage.setUser(user);
          setLoading(false);
        } else {
          Storage.setUser(user);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Navbar1></Navbar1>
          <PulseLoader className="spinning-wheel" color="#0d6efd" />
        </div>
      ) : (
        <TriggerProvider>
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/chat" element={<Chatbox />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/group-list" element={<GroupList />} />
            <Route path="/group-detail/:id" element={<GroupDetail />} />
            <Route path="/topic-list" element={<TopicList />} />
            <Route path="/topic-detail/:id" element={<TopicDetail />} />
            <Route path="/event-list" element={<EventList />} />
            <Route path="/calendar-view" element={<CalendarView />} />
          </Routes>
        </TriggerProvider>
      )}
    </>
  );
}

export default App;
