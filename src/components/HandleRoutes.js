import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";

const HandleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default HandleRoutes;
