import kindaSunny from "../../assets/kindaSunny.png";
import "./WeatherCard.css";

function WeatherCard({ WeatherData }) {
  return (
    <section className="weather__card">
      <p className="weather__card-temp">{WeatherData.temp.F}</p>
      <img className="weather__card-img" src={kindaSunny} alt="Kinda Sunny" />
    </section>
  );
}

export default WeatherCard;
