/**
 * Place Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive place data
    receivePlace(data) {
        AppDispatcher.handlePlaceAction({
            actionType: ActionConstants.PLACE_RECEIVE_DATA,
            data: data
        });
    }
};
