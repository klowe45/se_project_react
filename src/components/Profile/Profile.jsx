import React from "react";
import SideBar from "./SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  onAddNewClick,
  handleEditProfileClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onAddNewClick={onAddNewClick}
        />
      </section>
    </div>
  );
}

export default Profile;
