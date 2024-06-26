import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameSettings } from "../reducers/bingoReducer";
import { useGetThemesQuery } from "../data/ApiSlice";
import bingoApi from "../data/ApiSlice";

const GameSettings = () => {
  const [themeId, setThemeId] = useState("");
  const [gridSize, setGridSize] = useState(4);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: themes, error, isLoading } = useGetThemesQuery();

  useEffect(() => {
    if (themes && themes.length > 0) {
      setThemeId(themes[0].id); // Stel het eerste thema-ID in als standaard
    }
  }, [themes]);

  const handlePlay = () => {
    dispatch(setGameSettings({ themeId, gridSize }));
    dispatch(bingoApi.endpoints.getThemeWords.initiate(themeId)).then(() => {
      navigate("/bingo");
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading themes</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 p-4 relative">
      <a href="/">
        <img
          src="/roadtrip_game_logo.png"
          alt="Logo"
          className="absolute top-2 left-2 h-20"
        />
      </a>
      <h1 className="text-xl ml-10 sm:text-5xl md:text-6xl md:ml-16 md:top-3 font-bold text-red-600 mb-6 top-6 absolute">
        Thema en grootte kiezen
      </h1>
      <div className="mb-6 w-full max-w-md">
        <label className="block text-red-600 font-bold mb-2" htmlFor="theme">
          Thema:
        </label>
        <select
          id="theme"
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          className="bg-white border-2 border-red-400 p-2 rounded w-full"
        >
          {themes &&
            themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.thema}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-6 w-full max-w-md">
        <label className="block text-red-600 font-bold mb-2">
          Rastergrootte:
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <label className="inline-flex items-center mb-2 sm:mb-0">
            <input
              type="radio"
              value={4}
              checked={gridSize === 4}
              onChange={() => setGridSize(4)}
              className="form-radio"
            />
            <span className="ml-2">4x4</span>
          </label>
          <label className="inline-flex items-center mb-2 sm:mb-0">
            <input
              type="radio"
              value={5}
              checked={gridSize === 5}
              onChange={() => setGridSize(5)}
              className="form-radio"
            />
            <span className="ml-2">5x5</span>
          </label>
          <label className="inline-flex items-center mb-2 sm:mb-0">
            <input
              type="radio"
              value={6}
              checked={gridSize === 6}
              onChange={() => setGridSize(6)}
              className="form-radio"
            />
            <span className="ml-2">6x6</span>
          </label>
        </div>
      </div>
      <button
        onClick={handlePlay}
        className="bg-orange-500 text-white px-6 py-3 text-lg sm:text-xl rounded-lg hover:bg-orange-600"
      >
        START
      </button>
      <div>
        <button
          className="absolute bottom-2 left-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={() => navigate("/")}
        >
          beginpagina
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
