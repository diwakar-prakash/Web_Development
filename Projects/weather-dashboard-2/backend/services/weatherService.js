import axios from "axios";

const getWeatherInfo = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);

  return response.data;
};

export default getWeatherInfo;