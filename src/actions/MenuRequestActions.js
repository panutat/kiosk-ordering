/**
 * Menu Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import MenuApi from '../utilities/MenuApi';

module.exports = {
    // Get menu data by place id
    fetchMenuByPlaceId(placeId) {
        AppDispatcher.handleMenuAction({
            actionType: ActionConstants.MENU_REQUEST_DATA,
            placeId: placeId
        });
        MenuApi.initMenuDataByPlaceId(placeId);
    },
    // Get menu data by parent menu id
    fetchMenuByParentMenuId(placeId, parentMenuId) {
        AppDispatcher.handleMenuAction({
            actionType: ActionConstants.MENU_REQUEST_DATA,
            placeId: placeId,
            parentMenuId: parentMenuId
        });
        MenuApi.initMenuDataByParentMenuId(placeId, parentMenuId);
    },
    // Get menu data by child menu id
    fetchMenuByChildMenuId(placeId, childMenuId) {
        AppDispatcher.handleMenuAction({
            actionType: ActionConstants.MENU_REQUEST_DATA,
            placeId: placeId,
            childMenuId: childMenuId
        });
        MenuApi.initMenuDataByChildMenuId(placeId, childMenuId);
    }
};
