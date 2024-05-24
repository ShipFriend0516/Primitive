import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RouterProvider, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, createBrowserRouter } from "react-router-dom";
import routes from "./Routes";

const router = createBrowserRouter(routes);


ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));
