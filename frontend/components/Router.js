import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../actions/index.js';

import RouteHelper from './../libs/RouteHelper.js';
import Routes from './../Routes.js';

import reqwest from 'reqwest';
import nprogress from 'nprogress';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = function (state) {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({

    handleUnlisten: function () {},

    componentDidMount: function () {
        // listen for changes to the current location
        this.handleUnlisten = appHistory.listen(function (location, action) {

            // decide which path to call
            var path;
            const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            if (location.pathname.indexOf('?') !== -1) {
                path = location.pathname + '&guid=' + guid;
            } else {
                path = location.pathname + '?guid=' + guid;
            }

            // clear and start
            nprogress.done();
            nprogress.start();

            // do XHR request
            reqwest({
                method: 'get',
                url: path,
                type: 'json',
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(function (response) {

                // update store
                response.location = location.pathname;
                this.props.changeHistory(response);
                nprogress.done();

            }.bind(this), function (err, msg) {
                console.log('XHR ERROR');
                console.log(err);
                this.props.changeHistory({location: location.pathname});
                nprogress.done();
            }.bind(this));

        }.bind(this));
    },

    componentWillUnmount: function () {
        this.handleUnlisten();
    },

    render: function () {

        // get the component from the router
        var route = RouteHelper.match(Routes, this.props.location);
        var Component = route.component;

        // we may not send all the props, depending if there is a reducerKey
        var props = {};
        if (route.reducerKey) {
            // include all the action functions
            Object.keys(this.props).map(function (propKey) {
                // if it is a function, must be a redux action function
                if (Object.prototype.toString.call(this.props[propKey]) === '[object Function]') {
                    props[propKey] = this.props[propKey];
                }
            }.bind(this));

            // put the reducerKey properties at the top of the props, ignore other keys
            Object.keys(this.props[route.reducerKey]).map(function (prop) {
                props[prop] = this.props[route.reducerKey][prop];
            }.bind(this));
        } else {
            // send all the props
            props = Object.assign(props, this.props, {});
        }

        // return the component from the router with the appropriate props
        return (<Component {...props} />);
    }
}));
