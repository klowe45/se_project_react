import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  buttonTextTwo,
  titleText,
  closeModal,
  isOpen,
  onSubmit,
  toggleLoginRegister,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <form className="modal_form" onSubmit={onSubmit}>
          <h2 className="modal__title">{titleText}</h2>
          <button
            className="modal__close"
            type="button"
            onClick={closeModal}
          ></button>
          {children}
          <div>
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__button-login"
              type="button"
              onClick={toggleLoginRegister}
            >
              {buttonTextTwo}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
