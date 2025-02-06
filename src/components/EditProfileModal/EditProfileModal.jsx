import { React, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/hook";

const profileEditSubmit = (e) => {
  e.preventDefault();
  handleProfileSubmit(value);
};

function EditProfileModal({ activeModal, closeModal, handleProfileSubmit }) {
  const { value, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });
  const profileEditSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(value);
  };
  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Change profile data"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "profile-edit"}
      onSubmit={profileEditSubmit}
    >
      <label htmlFor="name" className="modal_label">
        Email*{""}
        <input
          type="text"
          id="name"
          className="modal_input"
          placeholder="Enter Name"
          value={value.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal_label">
        Avatar*{""}
        <input
          type="text"
          id="name"
          className="modal_input"
          placeholder="Enter Url"
          value={value.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
