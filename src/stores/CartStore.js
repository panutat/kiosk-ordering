/**
 * Place Store
 */
'use strict';

var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'CartStore.js';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/ActionTypes';

var _cart = [];
var _message = '';

/**
 * Store Start
 */
var CartStore = Object.assign({}, EventEmitter.prototype, {

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

    // Return cart
    getCart() {
        return _cart;
    },

    // Set new cart
    setCart(data) {
        _cart = data;
        return _cart;
    },

    // Return message and clear
    getMessage() {
        var message = _message;
        _message = '';
        return message;
    },

    // Set new message
    setMessage(data) {
        _message = data;
        return _message;
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

    case Constants.CART_RECEIVE_DATA:
        var data = JSON.parse(payload.data.text);
        CartStore.setCart(data.response);
        CartStore.setMessage(data.message);
        break;

    case Constants.CART_REQUEST_DATA:
        break;

    default:
        if (DEBUG) {
            console.log('[x] ' + _name + ':actionType --- NOT MATCH');
        }
        return true;
    }

    // If action was responded to, emit change event
    CartStore.emitChange();

    if (DEBUG) {
        console.log('[*] ' + _name + ':emitChange ---');
    }

    return true;

});

export default CartStore;
