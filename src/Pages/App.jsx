import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Map from "./Map/Map";
import AppointmentPage from "./Calendar/AppointmentPage";


const App = () => {



      <main className="App">
        <NavBar />
        <Routes>
        <Route path="/maps" element={<Map/>} />
        <Route path="/booking" element={<AppointmentPage/>} />
        </Routes>
        
      </main>
  } 


export default App;



