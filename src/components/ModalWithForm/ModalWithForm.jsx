import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  closeModal,
  isOpen,
  handleAddItemSubmit,
  onSubmit,
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
          <button
            className="modal__submit"
            type="submit"
            onClick={handleAddItemSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
