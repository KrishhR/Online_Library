import React, { createContext, useState } from "react";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

export let context = createContext();

function App() {

  let [ book, setBook ] = useState('');
  // let [ data, setData ] = useState([]);

  return (
    <div className="App">
    
      <context.Provider value={{ book, setBook  }} >
        <BrowserRouter>
          <Routes>
              <Route path="/" element={ <LandingPage /> } />
              <Route path="/home" element={ <Home /> } />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
