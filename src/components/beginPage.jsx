import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Tooltip } from "react-tooltip";

const BeginPage = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePlayClick = () => {
    navigate("/settings");
  };

  const handleCreateYourOwnGame = () => {
    navigate("/create-game");
  };

  const handleTooltipClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="grid grid-rows-custom grid-cols-custom min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 p-4 relative">
      <div className="absolute top-4 left-4">
        <img
          src="/question_mark.png"
          alt="Help"
          className="h-16 w-16 cursor-pointer"
        />
      </div>

      <div className="col-start-2 col-end-4 flex flex-col items-center">
        <marquee
          direction="left"
          scrollamount="12"
          className="text-3xl font-bold"
        >
          <img
            src="/reversed_moving_car.png"
            alt="Moving Car"
            className="h-12 inline-block ml-2"
          />
          vroem vroem
        </marquee>

        <marquee
          direction="right"
          scrollamount="12"
          className="text-3xl font-bold mb-6"
        >
          vroem vroem
          <img
            src="/moving_car.png"
            alt="Moving Car"
            className="h-12 inline-block ml-2"
          />
        </marquee>
      </div>

      <div className="row-start-2 row-end-3 col-start-2 col-end-3 flex flex-col items-center justify-center">
        <img
          src="/roadtrip_game_logo.png"
          alt="Roadtrip Bingo Logo"
          className="w-60 h- sm:w-72 sm:h-72 mx-auto mb-8 rounded"
        />

        <button
          onClick={handlePlayClick}
          className="bg-yellow-500 text-white mb-6 px-6 py-3 text-xl sm:text-2xl rounded-lg hover:bg-yellow-600"
        >
          Generate a bingo card
        </button>
        <button
          onClick={handleCreateYourOwnGame}
          className="bg-orange-500 text-white mb-6 px-5 py-3 text-xl sm:text-2xl rounded-lg hover:bg-orange-600"
        >
          Create Your Own Game
        </button>
      </div>
    </div>
  );
};

export default BeginPage;
