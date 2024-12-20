import React from "react";
import SideBar from "./SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
