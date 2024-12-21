import "./ItemModal.css";

function ItemModal({ activeModal, closeModal, card, handleDeleteItem }) {
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
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__item-description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => handleDeleteItem(card)}
            className="modal__button-delete"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
