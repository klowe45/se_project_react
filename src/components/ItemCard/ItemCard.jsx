import "./ItemCard.css";
import { useState, useEffect, useContext } from "react";
import likeButton from "../../assets/like-button.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { currentUser, isLoggedIn, clothingItems } =
    useContext(CurrentUserContext);
  const handleCardPreview = () => {
    handleCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser?.userId);

  const [isCurrentlyLiked, setIsCurrentlyLiked] = useState(isLiked || false);

  const itemLikeButtonClassName = `card__like-btn_is-liked`;

  const handleCardLikeState = () => {
    onCardLike(cardKey, isCurrentlyLiked);
  };

  useEffect(() => {
    const currnetItem = clothingItems.find(
      (clothingItem) => clothingItem._id === id
    );
    if (clothingItem) {
      isLiked = currnetItem.likes.some(
        (cardKey) => cardKey === userData?.userId
      );
      setIsCurrentlyLiked(isLiked);
    }
  }, [clothingItems]);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          src={likeButton}
          alt="like button"
          className={`card__like-btn ${
            isCurrentlyLiked ? itemLikeButtonClassName : ""
          }`}
          onClick={handleCardLikeState}
        ></button>
      </div>
      <img
        onClick={handleCardPreview}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
