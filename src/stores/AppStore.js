import { observable } from 'mobx';
import {currentWeatherByCity, currentWeatherByCoordinates} from "../api/weather";


class AppStore {
    @observable state = {
        searchCity: '',
        currentCity: '',
        lat: '',
        lon: '',
        weather: null
    };
    @observable cities = ['chelyabinsk', 'moscow', 'london'];

    searchCity(city) {
        this.state.currentCity = this.state.searchCity;
        city = city || this.state.currentCity;

        fetch(currentWeatherByCity(city))
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.error('searchCity: ', err));
    }

    mountApp() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setCurrentPosition(position.coords);
        });
    }

    setCurrentPosition(coords) {
        this.state.lat = coords.latitude;
        this.state.lon = coords.longitude;

        fetch(currentWeatherByCoordinates(this.state.lat, this.state.lon))
            .then((res) => res.json())
            .then((json) => this.setWeather(json))
            .catch((err) => console.error('initial: ', err));
    }

    getForecast(city) {
        this.searchCity(city);
    }

    setWeather(json) {
        this.state.currentCity = json.name;
        this.state.weather = json.main;
    }

    addCity() {
        if(~this.cities.indexOf(this.state.currentCity)) {
            return false;
        }

        this.cities.push(this.state.currentCity);
    }

    deleteCity(city) {
        this.cities = this.cities.filter(it => it !== city)
    }
}


const appStore = new AppStore();

export default appStore;