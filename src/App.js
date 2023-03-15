import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login.jsx';
import {
  Routes,
  Route
} from 'react-router-dom'
import Timeline from './views/Timeline';
import Dashboard from './views/Dashboard';
import GroupList from './views/GroupList';


function App() {
  return (
    
        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/timeline" element={<Timeline/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/group-list"  element = {<GroupList/>}/>
        </Routes>
      
      
  );
}

export default App;
