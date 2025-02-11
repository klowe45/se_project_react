import { useEffect, useState, useContext } from "react";
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
import DeleteModal from "../../components/DeleteModal/DeleteModal";

function App() {
  /***************************************************************************
   *                             CLOTHING ITEMS                              *
   **************************************************************************/

  const [clothingItems, setClothingItems] = useState([]);

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("No token found");
      return;
    }

    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then(() => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? { ...item, likes: [...item.likes, user.userId] }
                : item
            )
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeCardLike(id, token)
        .then(() => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? {
                    ...item,
                    likes: item.likes.filter((id) => id !== user.userId),
                  }
                : item
            )
          );
        })
        .catch((err) => console.log(err));
    }
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

  const handleRegistrationSubmit = ({ email, password, name, avatar }) => {
    console.log("Submitting registration with:", {
      email,
      password,
      name,
      avatar,
    });
    auth
      .register(email, password, name, avatar)
      .then(() => {
        handleLoginSubmit({ email, password });
        closeModal();
      })
      .catch(console.error);
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
        handleTokenCheck(data.token);
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
   *                                  Log out                                *
   **************************************************************************/

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
  };

  /***************************************************************************
   *                                  Edit Profile                           *
   **************************************************************************/

  const handleProfileSubmit = ({ name, avatar, _id }) => {
    const token = localStorage.getItem("jwt");
    api
      .profileEdited(name, avatar, _id, token)
      .then((data) => {
        console.log(data);
        setUser(data);
        closeModal();
      })
      .catch(console.error)
      .finally(() => {
        console.log("Profile updated");
      });
  };

  /***************************************************************************
   *                               Delete Item                              *
   **************************************************************************/

  const handleDeleteConfirmation = () => {
    const cardId = selectedCard._id;
    api.deleteItem(cardId).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== cardId)
      );
      setSelectedCard({});
      closeModal();
    });
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

  const handleDeleteClick = () => {
    setActiveModal("delete-modal");
  };

  /***************************************************************************
   *                              DOM UPDATES                                *
   **************************************************************************/

  const [updateDom, setUpdateDom] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      handleTokenCheck(token);
    } else {
      return;
    }
  }, []);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser: user, clothingItems, isLoggedIn }}
    >
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
                    handleCardLike={handleCardLike}
                    onCardClick={handleAddClick}
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
                      handleCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      onAddNewClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
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
            handleDeleteClick={handleDeleteClick}
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
          <DeleteModal
            activeModal={activeModal}
            handleDeleteConfirmation={handleDeleteConfirmation}
            closeModal={closeModal}
            handleDeleteItem={handleDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
