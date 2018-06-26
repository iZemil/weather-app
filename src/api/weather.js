// for more info: https://openweathermap.org/api
import { OWM_API_TOKEN } from '../../env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const PARAM_REST = `units=metric&appid=${OWM_API_TOKEN}`;

export const currentWeatherByCity = (city) => `${BASE_URL}/weather?q=${city}&${PARAM_REST}`;

export const currentWeatherByCoordinates = (lat, lon) => `${BASE_URL}/weather?lat=${lat}&lon=${lon}&${PARAM_REST}`;