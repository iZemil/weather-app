import { observable, computed, action, decorate } from 'mobx';
import {currentWeatherByCity, currentWeatherByCoordinates} from "../api/weather";


class AppStore {
    unit = 'C';
    currentCity = '';
    searchingCity = '';
    coords = {
        lat: '',
        lon: ''
    };
    isFetching = null;
    weather = null;
    cities = [];

    get fahrenheit() {
        return this.weather.temp + 273.15;
    }

    get kelvin() {
        return this.weather.temp * 9/5 + 32;
    }

    get temperature() {
        if(this.weather) {
            switch (this.unit) {
                case 'C':
                    return Math.round(this.weather.temp) + 'C°';
                case 'K':
                    return Math.round(this.kelvin) + 'K°';
                case 'F':
                    return Math.round(this.fahrenheit) + 'F°';
            }
        } else {
            return '—';
        }
    }

    changeUnit(unit) {
        return this.unit = unit;
    }

    searchCity(city) {
        this.isFetching = false;
        this.currentCity = city || this.searchingCity;

        fetch(currentWeatherByCity(this.currentCity))
            .then((res) => res.json())
            .then((json) => this.setWeather(json))
            .catch((err) => console.error('searchCity: ', err));
    }

    mountApp() {
        this.cities = JSON.parse(localStorage.getItem('owm_cities')) || [];

        navigator.geolocation.getCurrentPosition((position) => {
            this.setCurrentPosition(position.coords);
        }, (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                this.notFound();
            }
        });
    }

    setCurrentPosition(coords) {
        const lat = coords.latitude;
        const lon = coords.longitude;

        this.isFetching = false;
        this.coords = {
            lat,
            lon,
        };

        fetch(currentWeatherByCoordinates(lat, lon))
            .then((res) => res.json())
            .then((json) => this.setWeather(json))
            .catch((err) => {
                console.error('initial: ', err);
                this.notFound();
            });
    }

    getForecast(city) {
        this.isFetching = false;

        this.searchCity(city);
    }

    setWeather(json) {
        this.currentCity = json.name;
        this.weather = json.main;
        this.celsius = json.main.temp;

        this.toggleFetching();
    }

    notFound() {
        this.currentCity = 'Not found';

        this.toggleFetching();
    }

    toggleFetching() {
        setTimeout(() => this.isFetching = true, 1000);
    }


    toggleFavoriteCity() {

        if(this.cities.includes(this.currentCity)) {
            this.cities = this.cities.filter(city => city !== this.currentCity);
        } else {
            this.cities.push(this.currentCity);
            localStorage.setItem('owm_cities', JSON.stringify(this.cities));
        }
    }

    deleteCity(city) {
        this.cities = this.cities.filter(it => it !== city);
        localStorage.setItem('owm_cities', JSON.stringify(this.cities));
    }
}

export default decorate(AppStore, {
    unit: observable,
    currentCity: observable,
    searchingCity: observable,
    coords: observable,
    isFetching: observable,
    weather: observable,
    state: observable,
    cities: observable,
    temperature: computed,
    fahrenheit: computed,
    kelvin: computed,
    changeUnit: action,
    searchCity: action,
    mountApp: action,
    setCurrentPosition: action,
    getForecast: action,
    setWeather: action,
    addCity: action,
    deleteCity: action,
    toggleFetching: action,
    notFound: action,

});