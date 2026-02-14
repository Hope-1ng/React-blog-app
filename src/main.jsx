import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "../Store.jsx";
import { StoreProvider } from "easy-peasy";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider store={Store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </StrictMode>,
);
