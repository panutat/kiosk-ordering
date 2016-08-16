/**
 * Cart Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive cart data
    receiveCart(data) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_RECEIVE_DATA,
            data: data
        });
    }
};
