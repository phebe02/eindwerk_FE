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
  colors: ["#DC2626", "#F87171", "#B91C1C", "#15803D", "#C2410C", "#FFD700"],
  shapes: ["circle", "square"],
};

const ConfettiComponent = ({ trigger }) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
      <Confetti active={trigger} config={config} />
    </div>
  );
};

export default ConfettiComponent;
