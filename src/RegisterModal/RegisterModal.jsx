import { React, useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
//import { useForm } from "../Hooks/hook";

function RegisterModal({ activeModal, closeModal, handleRegistrationSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  /*const { value, handleChange, setValues } = useForm({
    _id: null,
    email: "",
    password: "",
    name: "",
    avatar: "",
  });*/

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onRegistration = (e) => {
    e.preventDefault();
    handleRegistrationSubmit(email, password, name, avatar);
  };

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign Up"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "register"}
      onSubmit={onRegistration}
    >
      <label htmlFor="email" className="modal__label">
        Email*{""}
        <input
          type="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          value={email.value}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{""}
        <input
          type="text"
          id="password"
          className="modal__input"
          placeholder="Password"
          value={password.value}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{""}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={name.value}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{""}
        <input
          type="text"
          id="Avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar.value}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
