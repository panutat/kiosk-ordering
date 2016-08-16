/**
 * Cart Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import CartApi from '../utilities/CartApi';

module.exports = {
    // Get cart data by customer id
    fetchCartByCustomerId(customerId, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            kioskStationId: kioskStationId
        });
        CartApi.initCartDataByCustomerId(customerId, kioskStationId);
    },
    // Add item to cart by customer id
    addItemToCartByCustomerId(customerId, itemId, qty, notes, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            itemId: itemId,
            qty: qty,
            notes: notes,
            kioskStationId: kioskStationId
        });
        CartApi.addItemToCartByCustomerId(customerId, itemId, qty, notes, kioskStationId);
    },
    // Update cart item by customer id
    updateCartItemByCustomerId(customerId, itemId, qty, notes, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            itemId: itemId,
            qty: qty,
            notes: notes,
            kioskStationId: kioskStationId
        });
        CartApi.updateCartItemByCustomerId(customerId, itemId, qty, notes, kioskStationId);
    },
    // Delete cart item by customer id
    deleteCartItemByCustomerId(customerId, itemId, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            itemId: itemId,
            kioskStationId: kioskStationId
        });
        CartApi.deleteCartItemByCustomerId(customerId, itemId, kioskStationId);
    },
    // Clear cart items by customer id
    clearCartByCustomerId(customerId, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            kioskStationId: kioskStationId
        });
        CartApi.clearCartByCustomerId(customerId, kioskStationId);
    },
    // Submit cart by customer id
    submitCartByCustomerId(customerId, kioskStationId) {
        AppDispatcher.handleCartAction({
            actionType: ActionConstants.CART_REQUEST_DATA,
            customerId: customerId,
            kioskStationId: kioskStationId
        });
        CartApi.submitCartByCustomerId(customerId, kioskStationId);
    }
};
