/**
 * Place Store
 */
'use strict';

var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'MenuStore.js';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/ActionTypes';

var _menu = [];
var _quickMenu = [];

/**
 * Store Start
 */
var MenuStore = Object.assign({}, EventEmitter.prototype, {

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

    // Return menu
    getMenu() {
        return _menu;
    },

    // Return quick menu
    getQuickMenu() {
        return _quickMenu;
    },

    // Set new menu
    setMenu(data) {
        _menu = data;

        // Check for root categories and set to _quickMenu
        var quickMenu = [];
        data.forEach((item) => {
            if (item.PlaceMenuTree.level === '1' && item.PlaceMenuTree.type === 'group') {
                quickMenu.push(item);
            }
        });
        if (quickMenu.length > 0) {
            _quickMenu = quickMenu;
        }

        return _menu;
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

    case Constants.MENU_RECEIVE_DATA:
        MenuStore.setMenu(JSON.parse(payload.data.text));
        break;

    case Constants.MENU_REQUEST_DATA:
        break;

    default:
        if (DEBUG) {
            console.log('[x] ' + _name + ':actionType --- NOT MATCH');
        }
        return true;
    }

    // If action was responded to, emit change event
    MenuStore.emitChange();

    if (DEBUG) {
        console.log('[*] ' + _name + ':emitChange ---');
    }

    return true;

});

export default MenuStore;
