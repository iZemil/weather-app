// for more info: https://openweathermap.org/api
import { OWM_API_TOKEN } from '../../env';


export const currentWeatherByCity = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OWM_API_TOKEN}`;