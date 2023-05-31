import NavBar from "./components/NavBar";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventBoard from "./components/Events/EventsBoard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <MemoryRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" exact element={<EventBoard />} />
        <Route path="/login" exact element={<Login />} />
        {/* <Route path="/login" element={Login} /> */}

        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
