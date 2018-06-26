import React, { Component } from 'react';


export default class App extends Component {

    render() {
        const {
            appStore
        } = this.props;

        return (
            <div>{ appStore.state[0] }</div>
        );
    }
}