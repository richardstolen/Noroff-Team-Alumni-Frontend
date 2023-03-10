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
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      
      
      </div>
    
    
    </BrowserRouter>
       
  );
}

export default App;
