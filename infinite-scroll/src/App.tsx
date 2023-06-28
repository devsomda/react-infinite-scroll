import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Dogs from "./components/Dogs";

function App() {
  return (
    <div className="App">
      <header>
        <h2>🐶 Lovely Fluffy Doggy 🐶</h2>
      </header>
      <h3>강아지를 무한대로 즐겨요!</h3>
      <Dogs />
    </div>
  );
}

export default App;
