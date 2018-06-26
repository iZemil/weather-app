import { observable, computed } from 'mobx';
import {currentWeatherByCity, currentWeatherByCoordinates} from "../api/weather";


class AppStore {
    @observable state = {
        searchCity: '',
        currentCity: '',
        lat: '',
        lon: '',
        weather: null,
        isFetching: false
    };
    @observable cities = ['Chelyabinsk', 'moscow', 'london'];

    @computed get temperature() {
        return this.state.weather ? Math.round(this.state.weather.temp) : '–';
    }

    searchCity(city) {
        this.state.currentCity = city || this.state.searchCity;
        city = city || this.state.currentCity;

        fetch(currentWeatherByCity(city))
            .then((res) => res.json())
            .then((json) => this.setWeather(json))
            .catch((err) => console.error('searchCity: ', err));
    }

    mountApp() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setCurrentPosition(position.coords);
        });
    }

    setCurrentPosition(coords) {
        this.state.isFetching = false;
        this.state.lat = coords.latitude;
        this.state.lon = coords.longitude;

        fetch(currentWeatherByCoordinates(this.state.lat, this.state.lon))
            .then((res) => res.json())
            .then((json) => this.setWeather(json))
            .catch((err) => {
                console.error('initial: ', err);
                this.notFound();
            });
    }

    getForecast(city) {
        this.state.isFetching = false;
        this.searchCity(city);
    }

    setWeather(json) {
        this.state.currentCity = json.name;
        this.state.weather = json.main;

        this.toggleFetching();
    }

    notFound() {
        this.state.currentCity = 'Not found';

        this.toggleFetching();
    }

    toggleFetching() {
        setTimeout(() => this.state.isFetching = true, 1000);
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