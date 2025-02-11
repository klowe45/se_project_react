import React from "react";
import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  onAddNewClick,
  handleCardLike,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const filteredItems = isLoggedIn
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  const itemCards = [];

  for (let i = 0; i < filteredItems.length; i++) {
    if (itemCards.length !== filteredItems.length) {
      const item = filteredItems[i];
      itemCards.push(
        <ItemCard
          key={i}
          id={item.id}
          item={item}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
        />
      );
    }
  }

  return (
    <div className="clothes">
      <div className="clothes__heading">
        <h2 className="clothes__title">Your Items</h2>
        <button onClick={onAddNewClick} className="clothes__button-add">
          + Add new
        </button>
      </div>
      <ul className="clothes__card-list">{itemCards}</ul>
    </div>
  );
}

export default ClothesSection;
