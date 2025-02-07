import { React, useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

function LoginModal({ activeModal, closeModal, handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetpassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(value);
  };

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Log In"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "login"}
      onSubmit={onLogin}
    >
      <label htmlFor="email" className="modal__label">
        Email*{""}
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleSetEmail}
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
          value={password}
          onChange={handleSetpassword}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
