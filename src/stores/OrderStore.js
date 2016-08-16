/**
 * Order Store
 */
'use strict';

var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'OrderStore.js';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/ActionTypes';

var _orders = [];

/**
 * Store Start
 */
var OrderStore = Object.assign({}, EventEmitter.prototype, {

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

    // Return orders
    getOrders() {
        return _orders;
    },

    // Set new orders
    setOrders(data) {
        _orders = data;

        return _orders;
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

    case Constants.ORDER_RECEIVE_DATA:
        OrderStore.setOrders(JSON.parse(payload.data.text));
        break;

    case Constants.ORDER_REQUEST_DATA:
        break;

    default:
        if (DEBUG) {
            console.log('[x] ' + _name + ':actionType --- NOT MATCH');
        }
        return true;
    }

    // If action was responded to, emit change event
    OrderStore.emitChange();

    if (DEBUG) {
        console.log('[*] ' + _name + ':emitChange ---');
    }

    return true;

});

export default OrderStore;
