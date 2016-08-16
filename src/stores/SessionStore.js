/**
 * Place Store
 */
'use strict';

var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'SessionStore.js';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/ActionTypes';

var _session = null;

/**
 * Store Start
 */
var SessionStore = Object.assign({}, EventEmitter.prototype, {

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

    // Return session
    getSession() {
        return _session;
    },

    // Set new session
    setSession(data) {
        _session = data;
        return _session;
    },

    // Reset session
    resetSession() {
        _session = null;
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

    case Constants.SESSION_RECEIVE_DATA:
        SessionStore.setSession(JSON.parse(payload.data.text));
        break;

    case Constants.SESSION_REQUEST_DATA:
        break;

    default:
        if (DEBUG) {
            console.log('[x] ' + _name + ':actionType --- NOT MATCH');
        }
        return true;
    }

    // If action was responded to, emit change event
    SessionStore.emitChange();

    if (DEBUG) {
        console.log('[*] ' + _name + ':emitChange ---');
    }

    return true;

});

export default SessionStore;
