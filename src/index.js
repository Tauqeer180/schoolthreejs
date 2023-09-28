import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/scss/bootstrap.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from "./reportWebVitals";
// import FBX from "./FBX";
// import Room from "./Room";
// import TreeScene from "./Tree";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App /> */}
    <Room />
    {/* <FBX /> */}
    {/* <TreeScene /> */}
    {/* <> hhhhhhh</> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
