// src/main.ts
import React from "react";
import ReactDOM from "react-dom/client";
import { LocationSearch } from './components'

const App: React.FC = () => (
	<div>
    Hello
  </div>
);

console.log(window)
console.log("NEW CODE!")


const root = ReactDOM.createRoot(document.getElementById("solaceFormEmbed"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
