import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { component, action } from 'universal-route';

// read routes
import Routes from './Routes.js';

// load up a react 404 component
import Unknown from './components/Unknown.js';

// get all actions
import * as adminActions from './actions/admin.js';

// combine all actions
const actions = Object.assign({}, adminActions, action);

console.log(action);
console.log(actions);

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
