import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'semantic-ui-react';
import Loader from './Loader';


function CurrentWeatherInformation({appStore}) {
    const {
        cities,
        isFetching,
        currentCity,
        temperature,

    } = appStore;

    return (
        <div>
            <h1 className="current-city">
                <Icon name='compass outline' link title="Current city" />
                <div className="current-city__name">{ isFetching ? currentCity : ' — ' }</div>
                <Icon name={cities.includes(currentCity) ? 'star' : 'star outline'} link title="Favorites" onClick={ () => appStore.toggleFavoriteCity() } />
            </h1>
            <div className="current-weather">
                { isFetching ? <span>{ temperature }</span> : <Loader /> }
            </div>
        </div>
    )
}


export default inject('appStore')(observer(CurrentWeatherInformation));