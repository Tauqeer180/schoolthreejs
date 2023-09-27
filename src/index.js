import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "bootstrap/scss/bootstrap.scss";

import reportWebVitals from "./reportWebVitals";
import FBX from "./FBX";
import Room from "./Room";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App /> */}
    <Room />
    {/* <FBX /> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
