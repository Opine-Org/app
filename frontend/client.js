import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { RouterComponent, actions } from 'universal-route';

// read routes
import Routes from './Routes.js';

// load up a react 404 component
import PageNotFound from './components/PageNotFound.js';

// get all actions
import * as adminActions from './actions/admin.js';

// combine all actions
const reduxActions = Object.assign({}, adminActions, actions);

// put the history manager in global namespace
import createHistory from 'history/createBrowserHistory';
window.appHistory = createHistory();

// initialize the router
const Router = RouterComponent(window.appHistory, Routes, reduxActions, PageNotFound);

// preload the store
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

// css
require('./styles/index.css');

// render the application
render(
    <Provider store={store}>
        <Router location={window.xLocation || window.location.pathname} />
    </Provider>,
    rootElement
);
