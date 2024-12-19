import React, { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [currentTemp, setCurrentTemp] = useState("F");
  const handleToggleSwitch = (e) => {
    if (currentTemp === "F") setCurrentTemp("C");
    if (currentTemp === "C") setCurrentTemp("F");
  };

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onChange={handleToggleSwitch}
      />
      <span
        className={
          currentTemp === "C"
            ? "switch__slider switch__slider-C"
            : "switch__slider switch__slider-F"
        }
      ></span>
      <p
        className={`switch__temp-F ${currentTemp === "F" && "switch__active"}`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${currentTemp === "C" && "switch__active"}`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
