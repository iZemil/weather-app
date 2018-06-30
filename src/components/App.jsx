import React, { Component } from 'react';
import { inject } from 'mobx-react';
import FavoritesCities from './FavoritesCities';
import CurrentWeatherInformation from './CurrentWeatherInformation';
import SearchCity from './SearchCity';


@inject('appStore')
export default class App extends Component {
    componentDidMount() {
        this.props.appStore.mountApp();
    }

    render() {

        return (
            <div className="app">
                <div className="container">
                    <CurrentWeatherInformation />

                    <SearchCity />

                    <FavoritesCities />
                </div>
            </div>
        );
    }
}