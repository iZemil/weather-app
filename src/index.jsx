import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/App.jsx';
import appStore from './models/AppStore';


render(
    <div>
        <DevTools />
        <App appStore={appStore} />
    </div>,
    document.getElementById('root'),
);