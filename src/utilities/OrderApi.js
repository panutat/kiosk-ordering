/**
 * Order API
 */
'use strict';

var DEBUG = false;
var _name = 'OrderApi.js';

import OrderResponseActions from '../actions/OrderResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get orders by customer id
    initOrdersDataByCustomerId(customerId, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getOrdersByCustomerId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                customerId: customerId,
                kioskStationId: kioskStationId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initOrdersDataByCustomerId --- ');
                    console.log(res);
                }
                OrderResponseActions.receiveOrders(res);
            });
    }
};
