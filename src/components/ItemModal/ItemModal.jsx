import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeModal, card, handleDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const cardId = card._id;
  /*const DeleteModal = () => {
    handleDeleteClick(cardId);
  };*/

  const isOwn = currentUser && card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__button-delete ${
    isOwn ? "" : "modal__button-delete_hidden"
  }`;

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
            onClick={handleDeleteClick}
            className={`modal__button-delete ${itemDeleteButtonClassName}`}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
