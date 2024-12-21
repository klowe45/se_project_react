import React from "react";
import SideBar from "./SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
