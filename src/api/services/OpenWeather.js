import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Openweather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
  params: {
    appid: REACT_APP_OPENWEATHER_API_KEY,
    units: 'metric'
  }
})

export default Openweather;