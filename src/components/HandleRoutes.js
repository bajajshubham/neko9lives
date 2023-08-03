import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import MainMenu from "./menu/MainMenu";

const HandleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<MainMenu />} />

      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default HandleRoutes;
