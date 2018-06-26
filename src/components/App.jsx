import React, { Component } from 'react';
import {observer} from 'mobx-react';


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

        return (
            <div>
                <div>
                    Current city: { state.currentCity }
                    <button onClick={ this.handleAddCity }>Add city to favorites</button>
                </div>
                <div>
                    <input
                        placeholder="Write city name"
                        name="city"
                        value={state.searchCity}
                        onChange={ this.handleChangeCity }
                    />
                    <button onClick={this.handleSearchCity}>Search</button>
                </div>
                <ul>
                    {
                        appStore.cities.map((city, index) =>
                            <li key={ 'key-' + index }>
                                { city }
                                <button onClick={ () => this.handleGetForecast(city) }>get forecast</button>
                                <button onClick={ () => this.handleDeleteCity(city) }>delete</button>
                            </li>)
                    }
                </ul>
            </div>
        );
    }
}