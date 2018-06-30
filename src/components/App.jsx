import React, { Component } from 'react';
import { inject } from 'mobx-react';
import FavoritesCities from './FavoritesCities';
import CurrentWeatherInformation from './CurrentWeatherInformation';
import SearchCity from './SearchCity';
import { Dropdown } from 'semantic-ui-react';


@inject('appStore')
export default class App extends Component {
    componentDidMount() {
        this.props.appStore.mountApp();
    }

    handleChangeOptions = (e, { value }) => {
        this.props.appStore.changeUnit(value);
    }

    render() {
        const appOptions = [
            { key: 'c', text: 'Celsius', value: 'C' },
            { key: 'f', text: 'Fahrenheit', value: 'F' },
            { key: 'k', text: 'Kelvin', value: 'K' },
        ];

        return (
            <div className="app">
                <div className="app__settings">
                    <Dropdown
                        button
                        className='icon'
                        icon='setting'
                        onChange={this.handleChangeOptions}
                        options={appOptions}
                        text='Scales'
                    />
                </div>
                <div className="container">
                    <CurrentWeatherInformation />

                    <SearchCity />

                    <FavoritesCities />
                </div>
            </div>
        );
    }
}