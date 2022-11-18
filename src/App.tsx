import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import {CreatePost} from "./pages/create-post/create-post"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
