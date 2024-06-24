import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const [gridSize, setGridSize] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Voor foutmelding
  const navigate = useNavigate();

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    setInputValues(Array(size * size).fill(""));
  };

  const handleInputChange = (index, value) => {
    if (value.length > 15) {
      setErrorMessage("Woorden mogen niet langer zijn dan 15 tekens.");
    } else {
      setErrorMessage("");
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);
    }
  };

  const handleGenerate = () => {
    if (inputValues.some((value) => value.length > 15)) {
      setErrorMessage("Alle woorden moeten 15 tekens of korter zijn.");
    } else {
      setErrorMessage("");
      navigate("/custom-bingo", { state: { gridSize, inputValues, title } });
    }
  };

  const allFieldsFilled =
    inputValues.every((value) => value.trim() !== "") && title.trim() !== "";

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100">
      <a href="/">
        <img
          src="/roadtrip_game_logo.png"
          alt="Logo"
          className="absolute top-2 left-2 h-20"
        />
      </a>
      <h1 className="md:text-5xl sm:text-3xl font-bold text-red-600 mb-7 mt-3 ">
        Maak je eigen bingokaart
      </h1>
      <div className="mb-4">
        <label className="block text-lg text-red-600 font-bold mb-2">
          kies een titel:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full border-red-400"
          placeholder="Bingokaart titel"
          maxLength={30}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg text-red-600 font-bold mb-2">
          Kies Rastergrootte:{" "}
        </label>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="gridSize"
              value={4}
              onChange={() => handleGridSizeChange(4)}
            />
            4x4
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="gridSize"
              value={5}
              onChange={() => handleGridSizeChange(5)}
            />
            5x5
          </label>
          <label>
            <input
              type="radio"
              name="gridSize"
              value={6}
              onChange={() => handleGridSizeChange(6)}
            />
            6x6
          </label>
        </div>
      </div>
      {gridSize && (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {inputValues.map((value, index) => (
            <input
              key={index}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="border p-2"
              placeholder={`Item ${index + 1}`}
            />
          ))}
        </div>
      )}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      {gridSize && (
        <button
          onClick={handleGenerate}
          className={`mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 ${
            !allFieldsFilled && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          genereer een bingokaart
        </button>
      )}
      <div>
        <button
          className="absolute bottom-2 left-2 bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          beginpagina
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
