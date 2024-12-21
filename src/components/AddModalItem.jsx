import { React, useState } from "react";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

function AddModalItem({
  activeModal,
  handleAddItemSubmit,
  closeModal,
  onAddItem,
  handleNameChange,
  name,
}) {
  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "add-garment"}
      handleAddItemSubmit={handleAddItemSubmit}
      onAddItem={onAddItem}
      name={name}
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
        <label htmlFor="hot" className="modal__label model__label__type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="hot"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label model__label__type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="warm"
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
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddModalItem;
