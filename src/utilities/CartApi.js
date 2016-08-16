/**
 * Cart API
 */
'use strict';

var DEBUG = false;
var _name = 'CartApi.js';

import CartResponseActions from '../actions/CartResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get cart by customer id
    initCartDataByCustomerId(customerId, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getCartByCustomerId`)
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
                    console.log('[*] ' + _name + ':initCartDataByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    },

    // Add item to cart by customer id
    addItemToCartByCustomerId(customerId, itemId, qty, notes, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/addItemToCartByCustomerId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                customerId: customerId,
                itemId: itemId,
                qty: qty,
                notes: notes,
                kioskStationId: kioskStationId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':addItemToCartByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    },

    // Update cart item by customer id
    updateCartItemByCustomerId(customerId, itemId, qty, notes, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/updateCartItemByCustomerId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                customerId: customerId,
                itemId: itemId,
                qty: qty,
                notes: notes,
                kioskStationId: kioskStationId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':updateCartItemByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    },

    // Delete cart item by customer id
    deleteCartItemByCustomerId(customerId, itemId, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/deleteCartItemByCustomerId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                customerId: customerId,
                itemId: itemId,
                kioskStationId: kioskStationId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':deleteCartItemByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    },

    // Clear cart items by customer id
    clearCartByCustomerId(customerId, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/clearCartByCustomerId`)
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
                    console.log('[*] ' + _name + ':clearCartByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    },

    // Submit cart by customer id
    submitCartByCustomerId(customerId, kioskStationId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/submitCartByCustomerId`)
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
                    console.log('[*] ' + _name + ':submitCartByCustomerId --- ');
                    console.log(res);
                }
                CartResponseActions.receiveCart(res);
            });
    }
};
