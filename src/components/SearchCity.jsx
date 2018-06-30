import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'semantic-ui-react';


function SearchCity({appStore}) {

    return (
        <div className="city-form">
            <Input
                placeholder="Write city name..."
                name="city"
                className="city-form__input"
                value={appStore.searchingCity}
                onChange={(e) => appStore.searchingCity = e.target.value}
            />
            <Button className="btn" onClick={() => appStore.searchCity()}>Search</Button>
        </div>
    )
}


export default inject('appStore')(observer(SearchCity));