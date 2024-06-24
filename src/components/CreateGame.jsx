import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const [gridSize, setGridSize] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    setInputValues(Array(size * size).fill(""));
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleGenerate = () => {
    navigate("/custom-bingo", { state: { gridSize, inputValues, title } });
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
      <h1 className="text-2xl mb-4">Create Your Own Bingo Game</h1>
      <div className="mb-4">
        <label className="block mb-2 text-lg">Enter Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Bingo Card Title"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg">Select Grid Size:</label>
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
      {gridSize && (
        <button
          onClick={handleGenerate}
          className={`mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 ${
            !allFieldsFilled && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Generate Bingo Card
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
