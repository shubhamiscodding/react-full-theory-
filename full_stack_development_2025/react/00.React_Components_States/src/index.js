import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Test from "./Test";
import { BrowserRouter as Router,Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>    
    <Router>
      <Test/>
    <Routes>
    <Route path="/" element={<Test/>} />
    <Route path="/react" element={<>React</>} />
    <Route path="/node" element={<>node</>} />
    <Route path="/link" element={<><Link to="/">Home</Link></>} />
    <Route path="/navlink" element={<><NavLink to="/link">NavLink</NavLink></>} />
    <Route path="/*" element={<><Navigate to="/node" /></>} />

    {/* <App /> */}
    {/* <Test /> */}
    </Routes>

    </Router>

  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
