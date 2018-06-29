import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/App.jsx';
import {Provider} from 'mobx-react';
import store from './stores';
import './styles.scss';


render(
    <Provider {...store}>
        <div>
            <DevTools />
            <App />
        </div>
    </Provider>,
    document.getElementById('root'),
);