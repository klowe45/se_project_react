import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  closeModal,
  isOpen,
  handleAddItemSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <form className="modal_form">
          <h2 className="modal__title">{titleText}</h2>
          <button
            className="modal__close"
            type="button"
            onClick={closeModal}
          ></button>
          {children}
          <button
            onSubmit={handleAddItemSubmit}
            className="modal__submit"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
