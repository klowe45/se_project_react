import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeModal, card, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner === currentUser._id;

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
          {isOwn ? (
            <>
              <button
                onClick={() => handleDeleteItem(card)}
                className="modal__button-delete"
              >
                Delete Item
              </button>
            </>
          ) : (
            <>
              <p>Must be signed in</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
