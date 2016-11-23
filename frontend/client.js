import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { component } from 'UniversalRoute';

// read routes
import Routes from './Routes.js';

// load up a react 404 component
import Unknown from './components/Unknown.js';

// get all actions
import * as routeActions from './actions/route.js';
import * as adminActions from './actions/admin.js';
const actions = Object.assign({}, routeActions, adminActions);

// put the history manager in global namespace
import createHistory from 'history/createBrowserHistory';
window.appHistory = createHistory();

// initialize the router
const Router = component(window.appHistory, Routes, actions, Unknown);

// preload the store
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

// css
require('./styles/index.css');

// render the application
render(
    <Provider store={store}>
        <Router location={window.location.pathname} />
    </Provider>,
    rootElement
);
