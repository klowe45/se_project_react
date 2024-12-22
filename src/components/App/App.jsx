import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
   *                                  MODAL                                  *
   **************************************************************************/

  const [activeModal, setActiveModal] = useState("preview-image");

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

  // const onAddItem = (values) => {
  //   console.log(values);
  // };

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
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddNewClick={() => setActiveModal("add-garment")}
                />
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
