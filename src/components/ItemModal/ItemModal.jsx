import "./ItemModal.css";

function ItemModal({ activeModal, closeModal, card }) {
  return (
    <div
      className={`modal ${activeModal === "preview-card" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={closeModal}
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;