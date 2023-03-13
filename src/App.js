import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login.jsx';
import {
  Routes,
  Route
} from 'react-router-dom'
import Timeline from './views/Timeline';
import Dashboard from './views/Dashboard';


function App() {
  return (
    
        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/timeline" element={<Timeline/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      
      
  );
}

export default App;
