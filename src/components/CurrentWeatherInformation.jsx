import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'semantic-ui-react';
import Loader from './Loader';


function CurrentWeatherInformation({appStore}) {

    return (
        <div>
            <h1 className="current-city">
                <Icon name='compass outline' link title="Current city" />
                <div className="current-city__name">{ appStore.state.isFetching ? appStore.state.currentCity : ' — ' }</div>
                <Icon name={~appStore.cities.indexOf(appStore.state.currentCity) ? 'star' : 'star outline'} link title="Favorites" onClick={ () => appStore.addCity() } />
            </h1>
            <div className="current-weather">
                { appStore.state.isFetching ? <span>{ appStore.temperature }<sup>o</sup></span> : <Loader /> }
            </div>
        </div>
    )
}


export default inject('appStore')(observer(CurrentWeatherInformation));