/**
 * Order Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import OrderApi from '../utilities/OrderApi';

module.exports = {
    // Get orders data by customer id
    fetchOrdersByCustomerId(customerId, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.ORDER_REQUEST_DATA,
            customerId: customerId,
            kioskStationId: kioskStationId
        });
        OrderApi.initOrdersDataByCustomerId(customerId, kioskStationId);
    }
};
