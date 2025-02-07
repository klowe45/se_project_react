import { React, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/hook";

function EditProfileModal({ activeModal, closeModal, handleProfileSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const profileEditSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(values);
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
          name="name"
          id="name"
          className="modal_input"
          placeholder="Enter Name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal_label">
        Avatar*{""}
        <input
          type="text"
          name="avatar"
          id="name"
          className="modal_input"
          placeholder="Enter Url"
          value={avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
