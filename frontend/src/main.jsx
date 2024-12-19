import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GlobalState from "./context/globalContext.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>
  </StrictMode>
);
