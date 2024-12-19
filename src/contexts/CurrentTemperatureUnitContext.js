import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  CurrentTemperatureUnit: "",
  handleTottleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;
