import { React, useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/hook";

function LoginModal({ activeModal, closeModal, handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { value, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

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
          id="email"
          className="modal__input"
          placeholder="Email"
          value={value.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{""}
        <input
          type="text"
          id="password"
          className="modal__input"
          placeholder="Password"
          value={value.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
