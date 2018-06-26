import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/App.jsx';
import appStore from './stores/AppStore';


render(
    <div>
        <DevTools />
        <App appStore={appStore} />
    </div>,
    document.getElementById('root'),
);