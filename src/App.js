import React, { createContext, useState } from "react";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Reader from "./Components/Reader";

export let context = createContext();

function App() {

  let [ book, setBook ] = useState('');
  let [ isLoading, setLoading ] = useState(false);
  let [ bookData, setBookData ] = useState([]);
  let [ detail, setDetail ] = useState('');

  return (
    <div className="App">
    
      <context.Provider value={{ book, setBook, isLoading, setLoading, bookData, setBookData, detail, setDetail }} >
        <BrowserRouter>
          <Routes>
              <Route path="/" element={ <LandingPage /> } />
              <Route path="/home" element={ <Home /> } />
              <Route path="/reader" element={ <Reader /> } />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
