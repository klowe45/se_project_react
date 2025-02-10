import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ weatherData, handleCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const { clothingItems } = useContext(CurrentUserContext);

  const sortedItems = () =>
    clothingItems.fliter((item) => item.weather === weatherData.type);

  let itemCards = [];

  for (let i = 0; i < sortedItems.length; i++) {
    if (itemCards.length !== sortedItems.length) {
      const item = sortedItems[i];
      itemCards.push(
        <ItemCard
          id={item._id}
          item={item}
          handleCardClick={handleCardClick}
          onCardLike={onCardLike}
        />
      );
    }
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__cards-text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg; / You may
          want to wear:
        </p>
        <ul className=".main__cards-list">{itemCards}</ul>
      </section>
    </main>
  );
}

export default Main;
