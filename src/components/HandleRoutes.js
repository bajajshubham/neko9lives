import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MainMenu from "./menu/MainMenu";
import Join from "./room/Join/Join";
import Create from "./room/Create/Create";
import Lobby from "./room/Create/Lobby";
import Playground from "./room/Playground/Playground.js";

const HandleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<MainMenu />} />
      <Route path="/join" element={<Join />} />
      <Route path="/room/create" element={<Create />} />
      <Route path="/lobby/:roomID" element={<Lobby />} />
      {/* <Route path="/playground/:roomID" element={<Playground />} /> */}

      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default HandleRoutes;
