import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./views/Timeline";
import Dashboard from "./views/Dashboard";
import KeyCloakService from "./security/KeyCloakService.ts";

function App() {
  return (
    <BrowserRouter>
      <button onClick={KeyCloakService.CallLogout()}>Logout</button>
      <p>Hello {KeyCloakService.GetUserName()}</p>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
