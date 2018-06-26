import { observable } from 'mobx';
import { currentWeatherByCity } from "../api/weather";


class AppStore {
    @observable state = {
        searchCity: 'chelyabinsk',
        currentCity: ''
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

    getForecast(city) {
        this.searchCity(city);
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