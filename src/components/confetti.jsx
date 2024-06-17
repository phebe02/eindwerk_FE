import React from "react";
import Confetti from "react-dom-confetti";

const config = {
  angle: "90",
  spread: 360,
  startVelocity: 40,
  elementCount: "199",
  dragFriction: 0.12,
  duration: "3000",
  stagger: "7",
  width: "15px",
  height: "14px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const ConfettiComponent = ({ trigger }) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
      <Confetti active={trigger} config={config} />
    </div>
  );
};

export default ConfettiComponent;
