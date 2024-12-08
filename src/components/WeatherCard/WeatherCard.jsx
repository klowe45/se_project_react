import kindaSunny from "../../assets/kindaSunny.png";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather__card">
      <p className="weather__card-temp">75°F</p>
      <img className="weather__card-img" src={kindaSunny} alt="Kinda Sunny" />
    </section>
  );
}

export default WeatherCard;
