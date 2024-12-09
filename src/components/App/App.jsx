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

function App() {
  const [activeModal, setActiveModal] = useState("preview-image");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
  });
  const [selectedCard, setSelectedCard] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredWeatherData = filterWeatherData(data);
        setWeatherData(filteredWeatherData);
      })
      .catch(console.log.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} wetherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeModal={closeModal}
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
            <input type="radio" className="modal__radio-input" id="hot" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label model__label__type_radio"
          >
            <input type="radio" className="modal__radio-input" id="warm" />
            {""}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label model__label__type_radio"
          >
            <input type="radio" className="modal__radio-input" id="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
