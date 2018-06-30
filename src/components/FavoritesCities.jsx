import React from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'semantic-ui-react';


function FavoritesCities({appStore}) {

    return (
        <ul className="cities-list">
            {
                appStore.cities.map((city, index) =>
                    <li key={ 'key-' + index } className="cities-list__item">
                        <span className="cities-list__item-name">– { city }</span>
                        <span className="cities-list__item-utils">
                            <Icon
                                name="search"
                                link title="Get forecast"
                                onClick={ () => appStore.getForecast(city) }
                            />
                                <Icon
                                    name="delete"
                                    link title="Delete"
                                    onClick={ () => appStore.deleteCity(city) }
                                />
                            </span>
                    </li>)
            }
        </ul>
    )
}

export default inject('appStore')(observer(FavoritesCities));