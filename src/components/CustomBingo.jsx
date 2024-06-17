import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markCustomItem, resetCustomBingo, setCustomGame } from "../actions";
import { useLocation, useNavigate } from "react-router-dom";
import ConfettiComponent from "./confetti";

const CustomBingo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gridSize, card, marked, bingo, completedBingos, title } = useSelector(
    (state) => state.customBingo
  );

  const [bingoMessage, setBingoMessage] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [bingoChecked, setBingoChecked] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { gridSize, inputValues, title } = location.state;
      const card = [];
      for (let i = 0; i < gridSize; i++) {
        card.push(inputValues.slice(i * gridSize, (i + 1) * gridSize));
      }
      dispatch(setCustomGame(gridSize, card, title));
    } else {
      navigate("/settings");
    }
  }, [location.state, navigate, dispatch]);

  useEffect(() => {
    if (bingo && !bingoChecked) {
      setBingoMessage(completedBingos.length > 1 ? "BINGO AGAIN!" : "BINGO!");
      setConfettiTrigger(true);
      setBingoChecked(true);
    }
  }, [bingo, bingoMessage, bingoChecked, completedBingos]);

  const handleClick = (row, col) => {
    if (
      !completedBingos.includes(`row${row}`) &&
      !completedBingos.includes(`col${col}`)
    ) {
      dispatch(markCustomItem(row, col));
      setBingoChecked(false); // Reset bingoChecked to allow new bingos
    }
  };

  const handleReplay = () => {
    navigate("/create-game");
  };

  const handleKeepPlaying = () => {
    setBingoMessage("");
    setConfettiTrigger(false);
    dispatch(resetCustomBingo());
    setBingoChecked(false);
  };

  return (
    <body>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 p-4 ">
        <ConfettiComponent trigger={confettiTrigger} />
        {bingoMessage && (
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-6">
            {bingoMessage}
          </h1>
        )}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
            {title}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto mb-6 w-full max-w-3xl">
          <table className="border-collapse border-2 border-red-400 w-full">
            <tbody>
              {card.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, colIndex) => (
                    <td
                      key={colIndex}
                      onClick={() => handleClick(rowIndex, colIndex)}
                      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-red-400 text-center align-middle cursor-pointer ${
                        marked[rowIndex][colIndex]
                          ? "bg-red-200 line-through"
                          : "bg-white"
                      }`}
                    >
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bingoMessage && (
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mt-6">
            <button
              onClick={handleReplay}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
            >
              new game
            </button>
            <button
              onClick={handleKeepPlaying}
              className="bg-green-500 text-white px-4 py-2 rounded h-"
            >
              Keep Playing
            </button>
          </div>
        )}
      </div>
    </body>
  );
};

export default CustomBingo;
