import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./views/Timeline";
import Dashboard from "./views/Dashboard";
import KeyCloakService from "./security/KeyCloakService.ts";
import Profile from "./views/Profile";
import { useEffect, useState } from "react";
import { getUser, createUser, getPosts } from "./api/apiHandler";
import Storage from "./storage/storage";
import { PulseLoader } from "react-spinners";
import GroupList from "./views/GroupList";
import TopicList from "./views/TopicList";
import Navbar1 from "./components/Navbar/Navbar1";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const storageUser = Storage.getUser();
      if (storageUser) {
        setLoading(false);
      }
      if (!storageUser) {
        const user = await getUser(KeyCloakService.GetId());
        if (user == null) {
          user = await createUser();
        }
        Storage.setUser(user);
        setLoading(false);
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
        <>
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/group-list" element={<GroupList />} />
            <Route path="/topic-list" element={<TopicList />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
