import NavBar from "./components/NavBar";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventBoard from "./components/Events/EventsBoard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<EventBoard />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
