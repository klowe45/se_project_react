import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  closeModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <form className="modal_form">
          <h2 className="modal__title">{titleText}</h2>
          <button
            className="modal__close"
            type="button"
            onClick={closeModal}
          ></button>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
