import { React, useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/hook";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, closeModal, handleProfileSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const currentUser = useContext(CurrentUserContext);

  const profileEditSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(values);
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "edit-profile"}
      onSubmit={profileEditSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*{""}
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder={currentUser.name}
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{""}
        <input
          type="text"
          name="avatar"
          id="avatar"
          className="modal__input"
          placeholder={currentUser.avatar}
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
