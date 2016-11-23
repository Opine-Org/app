import Express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import configureStore from './store/configureStore.js';

import { component } from 'UniversalRoute';

// read routes
import Routes from './Routes.js';

// load up a react 404 component
import Unknown from './components/Unknown.js';

// get all actions
import * as routeActions from './actions/route.js';
import * as adminActions from './actions/admin.js';
const actions = Object.assign({}, routeActions, adminActions);

// initialize the router
const Router = component(null, Routes, actions, Unknown);

const app = Express();
const port = 81;

function handleRender(req, res) {

    // compile an initial store state
    const preloadedState = req.body;

    // create a new redux store instance
    const store = configureStore(preloadedState)

    // render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <Router location={req.headers['x-location']} />
        </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
}

// parse application/json
app.use(bodyParser.json());

// catch all requests
app.use(handleRender);

const opineEnv = process.env.OPINE_ENV ? process.env.OPINE_ENV : 'local';
var jsFile = '/static/bundle.js';
var cssFile = '/static/bundle.css';
if (opineEnv != 'local') {
    const staticId = fs.readFileSync(path.resolve(process.env.PWD, 'static/bundle-prod-id.txt'), 'UTF-8');
    jsFile = '/static/bundle-prod-' + staticId.trim() + '.js';
    cssFile = '/static/bundle-prod-' + staticId.trim() + '.css';
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
        <head>
            <title>Application</title>
            <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.css">
            <link rel="stylesheet" type="text/css" href="${cssFile}" />
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
            </script>
            <script src="${jsFile}"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.js"></script>
        </body>
    </html>
    `
}

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
       console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});
