import { observable } from 'mobx';


class AppStore {
    @observable state = {
        searchCity: '',
        currentCity: ''
    };
    @observable cities = ['chelyabinsk', 'moscow', 'london'];

    searchCity() {
        this.state.currentCity = this.state.searchCity;
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