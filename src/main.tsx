// src/main.ts
import React from "react";
import ReactDOM from "react-dom/client";

const App: React.FC = () => <div>Hello</div>;

const root = ReactDOM.createRoot(document.getElementById("solaceEntryWidget"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
