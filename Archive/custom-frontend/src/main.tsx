import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import "./index.css";
import { ChainlitAPI, ChainlitContext } from "@chainlit/react-client";

// Define the full base URL for Chainlit server
const CHAINLIT_SERVER = "http://localhost:8000";

console.log("Initializing Chainlit API with server:", CHAINLIT_SERVER);

// Initialize Chainlit API with debug logging
const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "webapp");

// Add a window-level error handler to catch WebSocket errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.message, event);
});

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChainlitContext.Provider value={apiClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChainlitContext.Provider>
  </React.StrictMode>
);
