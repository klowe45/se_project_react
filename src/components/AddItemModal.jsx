import { React, useState } from "react";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

function AddItemModal({ activeModal, closeModal, onSubmit }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [url, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, weather, imageUrl });
    closeModal();
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={url}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the wearther type:</legend>
        <label htmlFor="hot" className="modal__label model__label__type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="hot"
            onChange={handleWeatherChange}
            value={"hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label model__label__type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="warm"
            onChange={handleWeatherChange}
            value={"warm"}
          />
          {""}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label model__label__type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="cold"
            onChange={handleWeatherChange}
            value={"cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
