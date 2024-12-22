import React from "react";
import "./ClothesSection.css";
// import { defaultClothingItems } from "../../../utils/constants";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, onAddNewClick }) {
  return (
    <div className="clothes">
      <div className="clothes__heading">
        <h2 className="clothes__title">Your Items</h2>
        <button onClick={onAddNewClick} className="clothes__button-add">
          + Add new
        </button>
      </div>
      <ul className="clothes__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
