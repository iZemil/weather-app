import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
export default class App extends Component {

    handleChangeCity = (e) => {
        const value = e.target.value;

        this.props.appStore.state.searchCity = value;
    }

    handleSearchCity = () => {
        this.props.appStore.searchCity();
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
                        onChange={ this.handleChangeCity }
                    />
                    <button onClick={this.handleSearchCity}>Search</button>
                </div>
                <ul>
                    {
                        appStore.cities.map((city, index) =>
                            <li key={ 'key-' + index }>
                                { city }
                                <button onClick={ () => this.handleDeleteCity(city) }>delete</button>
                            </li>)
                    }
                </ul>
            </div>
        );
    }
}