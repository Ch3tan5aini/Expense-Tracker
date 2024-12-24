import React from "react";
import SignUpPage from "./pages/signUp";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Tracker from "./pages/Tracker";
import LoginPage from "./pages/login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/sign-up" element={<SignUpPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/tracker/:user" element={<Tracker />} />
      </Routes>
    </div>
  );
}

export default App;
