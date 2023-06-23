import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Dogs from "./components/Dogs";

function App() {
  return (
    <div className="App">
      <header>
        <h2>🐶 Lovely Fluffy Dogy 🐶</h2>
      </header>
      <Dogs />
    </div>
  );
}

export default App;
