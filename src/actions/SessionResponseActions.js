/**
 * Session Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive session data
    receiveSession(data) {
        AppDispatcher.handleSessionAction({
            actionType: ActionConstants.SESSION_RECEIVE_DATA,
            data: data
        });
    }
};
