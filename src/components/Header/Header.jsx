import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__user">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar header__avatar_backUp">
                  {currentUser?.name?.charAt(0).toUpperCase() || ""}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__registration">
          <button
            type="button"
            className="header__signup-btn"
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            className="header__signin-btn"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
