import Weather from "./components/Weather";
import Daily from './components/Daily'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hourly from './components/Hourly';
import './App.css';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


function App(){
  return<>
 

     <Router>
      <Routes>
        <Route path="/" element={<Weather apiKey={API_KEY}/>} />
        <Route path="/daily" element={<Daily apiKey={API_KEY}/>} />  {/* New Page */}
        <Route path="/hourly" element={<Hourly apiKey={API_KEY} />} />
      </Routes>
    </Router>
   
  </>
}

export default App;