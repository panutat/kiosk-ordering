/**
 * Session Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import SessionApi from '../utilities/SessionApi';

module.exports = {
    // Gets session data from username and password
    fetchSession(username, password) {
        AppDispatcher.handleSessionAction({
            actionType: ActionConstants.SESSION_REQUEST_DATA,
            username: username,
            password: password
        });
        SessionApi.initSessionData(username, password);
    }
};
