import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, createBrowserRouter } from "react-router-dom";
import routes from "./Routes";

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider router={router}>
    <Router basename="/primitive">
      <Routes>
        {routes.map((router) => (
          <Route key={router.path} path={router.path} element={router.element} />
        ))}
      </Routes>
    </Router>
  </RouterProvider>
);
