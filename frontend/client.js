import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './components/Router.js';

// css
require('./styles/index.css');

// put the history manager in global namespace
import createHistory from 'history/createBrowserHistory';
window.appHistory = createHistory();

// preload the store
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

// render the application
render(
    <Provider store={store}>
        <Router location={window.location.pathname} />
    </Provider>,
    rootElement
);
