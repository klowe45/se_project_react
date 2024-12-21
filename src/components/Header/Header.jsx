import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-cloths-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__profile-link">
        <div className="header__user-container">
          <p className="header__user">User Name</p>
          <img className="header__avatar" src={avatar} alt="User Name" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
