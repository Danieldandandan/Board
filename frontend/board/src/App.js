import NavBar from "./components/NavBar";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import EventBoard from "./components/Events/EventsBoard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateBacklog from "./components/CreateBacklog";
import EventInfo from "./components/Events/EventInfo";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" exact element={<EventBoard />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/event/info/:id" element={<EventInfo />} />
        {/* <Route path="/login" element={Login} /> */}
        <Route path="/create" element={<CreateBacklog />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
