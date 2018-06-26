import React, { Component } from 'react';
import { Icon, Input, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import Loader from './Loader';
import './app.scss';

@observer
export default class App extends Component {
    componentDidMount() {
        this.props.appStore.mountApp();
    }

    handleChangeCity = (e) => {
        const value = e.target.value;

        this.props.appStore.state.searchCity = value;
    }

    handleSearchCity = () => {
        this.props.appStore.searchCity();
    }

    handleGetForecast = (city) => {
        this.props.appStore.getForecast(city);
    }

    handleDeleteCity = (city) => {
        this.props.appStore.deleteCity(city);
    }

    handleAddCity = () => {
        this.props.appStore.addCity();
    }

    render() {
        const { appStore } = this.props;
        const state = appStore.state;
        const weather = state.weather;

        return (
            <div className="app">
                <div className="container">
                    <h1 className="current-city">
                        <Icon name='compass outline' link title="Current city" /> { state.currentCity }{' '}
                        <Icon name='star outline' link title="Favorites" onClick={ this.handleAddCity } />
                    </h1>
                    <div className="current-weather">
                        { weather ? <span>{ appStore.state.weather.temp }<sup>o</sup></span> : <Loader /> }
                    </div>
                    <div className="city-form">
                        <Input
                            placeholder="Write city name..."
                            name="city"
                            className="city-form__input"
                            value={state.searchCity}
                            onChange={ this.handleChangeCity }
                        />
                        <Button className="btn" onClick={this.handleSearchCity}>Search</Button>
                    </div>
                    <ul className="cities-list">
                        {
                            appStore.cities.map((city, index) =>
                                <li key={ 'key-' + index } className="cities-list__item">
                                    <span className="cities-list__item-name">– { city }</span>
                                    <span className="cities-list__item-utils">
                                        <Icon
                                            name="search"
                                            link title="Get forecast"
                                            onClick={ () => this.handleGetForecast(city) }
                                        />
                                        <Icon
                                            name="delete"
                                            link title="Delete"
                                            onClick={ () => this.handleDeleteCity(city) }
                                        />
                                    </span>
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}