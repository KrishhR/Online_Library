import React, { createContext, useState } from "react";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Reader from "./Components/Reader";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './App.css';
import LightModeIcon from '@mui/icons-material/LightMode';

export let context = createContext();


function App() {

  let [ book, setBook ] = useState('');
  let [ isLoading, setLoading ] = useState(false);
  let [ isbn, setIsbn ] = useState('');
  let [ theme, setTheme ] = useState(true);

  const themeSwitch = (event) => {
    document.body.classList.toggle('dark-mode');
    
  }
  

  return (
    <div className="App">
    
      <context.Provider value={{ book, setBook, isLoading, setLoading, isbn, setIsbn }} >
        <BrowserRouter>
          <Routes>
              <Route path="/" element={ <LandingPage /> } />
              <Route path="/home" element={ <Home /> } />
              <Route path="/reader" element={ <Reader /> } />
          </Routes>
          <div className="themeBtn" onClick={themeSwitch}>
          <span onClick={()=>setTheme(!theme)}>
            {
              (theme) ? (<DarkModeIcon id='darkBtn'  />) : ( <LightModeIcon id='lightMode' /> )
            }
            </span>
          </div>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
