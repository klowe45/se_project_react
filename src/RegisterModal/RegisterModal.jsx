import { React, useState, useEffect } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/hook";

function RegisterModal({
  activeModal,
  closeModal,
  handleRegistrationSubmit,
  handleLoginClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleResetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  };

  const onRegistration = (e) => {
    e.preventDefault();
    handleRegistrationSubmit(values);
  };

  const handleOrLogInClick = () => {
    handleLoginClick();
  };

  useEffect(handleResetInputs, [activeModal]);

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign Up"
      buttonTextTwo="Or Log In"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "register"}
      onSubmit={onRegistration}
      orLogIn={handleOrLogInClick}
    >
      <label htmlFor="email" className="modal__label">
        Email*{""}
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{""}
        <input
          type="text"
          name="password"
          id="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{""}
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{""}
        <input
          type="text"
          name="avatar"
          id="Avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
