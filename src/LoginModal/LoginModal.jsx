import { React, useEffect, useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/hook";

function LoginModal({ activeModal, closeModal, handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(values);
  };

  const handleResetInputs = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(handleResetInputs, [activeModal]);

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
    </ModalWithForm>
  );
}

export default LoginModal;
