/**
 * Application Root File
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'director';
import AppDispatcher from './dispatcher/AppDispatcher';
import ActionTypes from './constants/ActionTypes';
import AppConfig from './config.js';

import Launch from './pages/Launch';
import Place from './pages/Place';
import Suite from './pages/Suite';
import Orders from './pages/Orders';

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

AppConfig.hostName = window.location.hostname;

/**
 * Check if Page component has a layout property; and if yes, wrap the page
 * into the specified layout, then mount to container in config file.
 */
var render = (router, page) => {
    var uri = router.getRoute();
    var child, props = {
        uri: uri,
        router: router
    };
    var obj = page();
    while (obj.props && obj.props.layout) {
        child = page(props, child);
        props = Object.assign(props, obj.props);
        obj = obj.props.layout;
    }
    if (!obj || typeof obj !== 'function') {
        throw 'Did you set "layout" in "props" for "' + uri + '" route?';
    }
    ReactDOM.render(obj(props, child), AppConfig.container);
};

// Initialize a router
// Define URL routes
// See https://github.com/flatiron/director
var router = new Router({
    '/': () => render(router, React.createFactory(Launch)),
    '/place': () => render(router, React.createFactory(Place)),
    '/suite': () => render(router, React.createFactory(Suite)),
    '/orders': () => render(router, React.createFactory(Orders)),
});
router.configure({
    html5history: false
}).init('/');

// Register Main Application Dispatcher
AppDispatcher.register((payload) => {
    if (payload.actionType === ActionTypes.SET_CURRENT_ROUTE) {
        router.setRoute(payload.route);
    }
    return true; // No errors.  Needed by promise in Dispatcher.
});
