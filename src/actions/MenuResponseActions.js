/**
 * Menu Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive menu data
    receiveMenu(data) {
        AppDispatcher.handleMenuAction({
            actionType: ActionConstants.MENU_RECEIVE_DATA,
            data: data
        });
    }
};
