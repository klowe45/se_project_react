import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-location">June 15, New York</p>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-cloths-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__user">User Name</p>
        <img className="header__avatar" src={avatar} alt="User Name" />
      </div>
    </header>
  );
}

export default Header;
