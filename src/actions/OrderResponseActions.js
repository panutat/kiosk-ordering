/**
 * Order Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive cart data
    receiveOrders(data) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.ORDER_RECEIVE_DATA,
            data: data
        });
    }
};
