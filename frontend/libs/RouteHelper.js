import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Unknown from './../components/Unknown.js';

export default {
    match: function (Routes, location) {
        // loop through all the routes
        const route = Routes.map(function(route) {
            // attempt to match
            if (route.re.exec(location)) {
                return route;
            }

        // remove null elements
        }).filter(function (route) {
            if (route) {
                return true;
            }
            return false;

        // condense array to object
        }).reduce(function (result, item) {
            return item;
        }, {});

        // we couldn't match anything
        if (Object.keys(route).length == 0) {
            return {
                component: Unknown
            };
        }

        // send the route
        return route;
    },

    prepare: function (Routes) {

        // loop over all routes
        return Object.keys(Routes).map(function (route) {
            var routeKeys = [];
            var re = pathToRegexp(route, routeKeys);
            var component, reducer;

            // handle a case where we want to be able to filter props by reducer key later
            if (Object.prototype.toString.call(Routes[route]) === '[object Array]') {
                component = Routes[route][0];
                reducer = Routes[route][1];
            } else {
                component = Routes[route];
            }

            // send out a more useful data structure
            return {
                re: re,
                keys: routeKeys,
                component: component,
                reducerKey: reducer
            };
        });
    }
};
