import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login.jsx';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className=" d-grid h-100">
        
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      
      
      </div>
    
    
    </BrowserRouter>
       
  );
}

export default App;
