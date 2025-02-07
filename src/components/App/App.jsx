import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { api } from "../../utils/api";
import AddItemModal from "../AddItemModal";
import * as auth from "../../utils/Auth";
import RegisterModal from "../../RegisterModal/RegisterModal";
import LoginModal from "../../LoginModal/LoginModal";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  /***************************************************************************
   *                             CLOTHING ITEMS                              *
   **************************************************************************/

  const [clothingItems, setClothingItems] = useState([]);

  /***************************************************************************
   *                              CARD SELECTED                              *
   **************************************************************************/

  const [selectedCard, setSelectedCard] = useState({});

  /***************************************************************************
   *                               TOGGLE TEMP                               *
   **************************************************************************/

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  /***************************************************************************
   *                                  User                                    *
   **************************************************************************/

  const [user, setUser] = useState({ email: "", name: "", avatar: "" });

  /***************************************************************************
   *                                  Registration                           *
   **************************************************************************/

  const handleRegistrationSubmit = (email, password, name, avatar) => {
    console.log("Submitting registration with:", {
      email,
      password,
      name,
      avatar,
    });
    auth
      .register({ email, password, name, avatar })
      .then((res) => {
        console.log("Registration response:", res);
        if (!res || !res.email || !res.password) {
          throw new Error("Invalid response from register API");
        }
        return auth.login(res.email, res.password).then((res) => {
          console.log("Login response:", res);
          if (!res.token) {
            throw new Error("No token received from login API");
          }
          localStorage.setItem("jwt", res.token);
          return auth.checkForToken(res.token);
        });
      })
      .then(({ name, email, avatar }) => {
        console.log("User data received:", { name, email, avatar });
        setUser({ name, email, avatar });
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => {
        console.error("Error during registration process:", err);
      })
      .finally(() => {
        console.log("submited register");
      });
  };

  /***************************************************************************
   *                                  Login                                  *
   **************************************************************************/

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = ({ email, password }) => {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch(console.error);
  };

  const handleTokenCheck = (token) => {
    auth
      .checkForToken(token)
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser({});
        setIsLoggedIn(false);
      });
  };

  /***************************************************************************
   *                                  Edit Profile                           *
   **************************************************************************/

  const handleProfileSubmit = ({ name, avatar }) => {
    api
      .profileEdited(token, name, avatar)
      .then((res) => {
        setUser(res);
        closeModal();
      })
      .catch(console.error);
  };

  /***************************************************************************
   *                                  MODAL                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("");

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  /***************************************************************************
   *                              USE-EFFECT/API                             *
   **************************************************************************/

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (item) => {
    api
      .addItems(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (card) => {
    api
      .deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        closeModal();
      })
      .catch((err) => console.elog(err));
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      handleTokenCheck(token);
    } else {
      return;
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser: user }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddNewClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            closeModal={closeModal}
            activeModal={activeModal}
            onSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeModal={closeModal}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            closeModal={closeModal}
            handleRegistrationSubmit={handleRegistrationSubmit}
          />
          <LoginModal
            activeModal={activeModal}
            closeModal={closeModal}
            handleLoginSubmit={handleLoginSubmit}
          />
          <EditProfileModal
            activeModal={activeModal}
            handleProfileSubmit={handleProfileSubmit}
            closeModal={closeModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
