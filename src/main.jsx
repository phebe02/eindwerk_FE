// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import store from "./data/store.js";
import BeginPage from "./components/beginPage.jsx";
import GameSettings from "./components/GameSettings.jsx";
import BingoCard from "./components/BingoCard.jsx";
import CustomBingo from "./components/CustomBingo.jsx";
import CreateGame from "./components/CreateGame.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<BeginPage />} />
            <Route path="settings" element={<GameSettings />} />
            <Route path="bingo" element={<BingoCard />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/custom-bingo" element={<CustomBingo />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
