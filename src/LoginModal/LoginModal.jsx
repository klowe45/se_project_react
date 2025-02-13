import { React, useEffect, useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/hook";

function LoginModal({
  activeModal,
  closeModal,
  handleLoginSubmit,
  handleRegisterClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(values);
    console.log(values);
  };

  const handleOrSignUp = () => {
    handleRegisterClick();
  };

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [activeModal, setValues]);

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Log In"
      buttonTextTwo="Or Sign Up"
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "login"}
      onSubmit={onLogin}
      orSignUp={handleOrSignUp}
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
          type="password"
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
