/**
 * Suite Store
 */
'use strict';

var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'SuiteStore.js';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/ActionTypes';

var _suite = {};
var _suites = [];

/**
 * Store Start
 */
var SuiteStore = Object.assign({}, EventEmitter.prototype, {

    // Emit Change event
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    // Add change listener
    addChangeListener(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    },

    // Return all suites
    getSuites() {
        return _suites;
    },

    // Return specific suite by ID
    getSuite(suiteId) {
        if (suiteId) {
            for (var i in _suites) {
                if (_suites[i].KioskStation.id === suiteId) {
                    _suite = _suites[i];
                }
            }
        }
        return _suite;
    },

    // Get suite
    setSuite(data) {
        _suite = data;
        return _suite;
    },

    // Set new suites
    setSuites(data) {
        _suites = data;
        return _suites;
    }
});

/**
 * Integrated with Dispatcher
 */
AppDispatcher.register((payload) => {

    var action = payload.actionType;

    if (DEBUG) {
        console.log('[*] ' + _name + ':Dispatch-Begin --- ' + action);
        console.log('     Payload:');
        console.log(payload);
    }

    // Route Logic
    switch (action) {

    case Constants.SUITE_RESET_DATA:
        break;

    case Constants.SUITES_RECEIVE_DATA:
        SuiteStore.setSuites(JSON.parse(payload.data.text));
        break;

    case Constants.SUITES_REQUEST_DATA:
        break;

    case Constants.SUITE_RECEIVE_DATA:
        SuiteStore.setSuite(JSON.parse(payload.data.text));
        break;

    case Constants.SUITE_REQUEST_DATA:
        break;

    default:
        if (DEBUG) {
            console.log('[x] ' + _name + ':actionType --- NOT MATCH');
        }
        return true;
    }

    // If action was responded to, emit change event
    SuiteStore.emitChange();

    if (DEBUG) {
        console.log('[*] ' + _name + ':emitChange ---');
    }

    return true;

});

export default SuiteStore;
