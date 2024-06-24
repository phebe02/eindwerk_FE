import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markItem, resetBingo } from "../actions";
import { useNavigate } from "react-router-dom";
import ConfettiComponent from "./confetti";

const BingoCard = () => {
  const card = useSelector((state) => state.bingo.card);
  const marked = useSelector((state) => state.bingo.marked);
  const bingo = useSelector((state) => state.bingo.bingo);
  const completedBingos = useSelector((state) => state.bingo.completedBingos);
  const [bingoMessage, setBingoMessage] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [bingoChecked, setBingoChecked] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (bingo && !bingoChecked) {
      setBingoMessage(completedBingos.length > 1 ? "BINGO AGAIN!" : "BINGO!");
      setConfettiTrigger(true);
      setBingoChecked(true);
    }
  }, [bingo, bingoMessage, bingoChecked]);

  const handleClick = (row, col) => {
    if (
      !completedBingos.includes(`row${row}`) &&
      !completedBingos.includes(`col${col}`)
    ) {
      dispatch(markItem(row, col));
      setBingoChecked(false);
    }
  };

  const handleReplay = () => {
    nav("/settings");
  };

  const handleKeepPlaying = () => {
    setBingoMessage("");
    setConfettiTrigger(false);
    dispatch(resetBingo());
    setBingoChecked(false);
  };

  return (
    <body>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 p-2 ">
        <ConfettiComponent trigger={confettiTrigger} />
        {bingoMessage && (
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
            {bingoMessage}
          </h1>
        )}
        <div className="text-center mb-6">
          <img
            src="/roadtrip_game_logo.png"
            alt="Roadtrip Bingo Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
            Roadtrip Bingo
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
          <div className="flex flex-row space-x-2 sm:space-x-4 ">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mb-2 sm:mb-0"
              onClick={() => navigate("/")}
            >
              beginpagina
            </button>

            <button
              onClick={handleReplay}
              className="bg-orange-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 hover:bg-orange-700"
            >
              nieuw spel
            </button>
            <button
              onClick={handleKeepPlaying}
              className="bg-green-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 hover:bg-green-700"
            >
              blijf spelen
            </button>
          </div>
        )}
      </div>
    </body>
  );
};

export default BingoCard;
