import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { MoodProvider } from "./context/MoodContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MoodProvider>
          <App />
        </MoodProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
