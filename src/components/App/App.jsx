import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  /***************************************************************************
   *                              CARD SELECTED                              *
   ***************************************************************************/

  const [selectedCard, setSelectedCard] = useState({});

  /***************************************************************************
   *                               TOGGLE TEMP                               *
   ***************************************************************************/

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  console.log(currentTemperatureUnit);

  const handleToggleSwitchChange = () => {
    // currentTemperatureUnit === "F"
    //   ? setCurrentTemperatureUnit("C")
    //   : setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  /***************************************************************************
   *                                  MODAL                                    *
   ****************************************************************************/

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

  /***************************************************************************
   *                               USE-EFFECT                                  *
   ****************************************************************************/
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={(currentTemperatureUnit, handleToggleSwitchChange)}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          titleText="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
        >
          <label htmlFor="name" className="modal__label">
            Name{""}
            <input
              type="text"
              id="name"
              className="modal__input"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image{""}
            <input
              type="url"
              id="imageURL"
              className="modal__input"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the wearther type:</legend>
            <label
              htmlFor="hot"
              className="modal__label model__label__type_radio"
            >
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="hot"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label model__label__type_radio"
            >
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="warm"
              />
              {""}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label model__label__type_radio"
            >
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="cold"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
