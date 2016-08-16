/**
 * Suite Response Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';

module.exports = {
    // Receive suites data
    receiveSuites(data) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITES_RECEIVE_DATA,
            data: data
        });
    },
    // Receive one suite data
    receiveSuite(data) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITE_RECEIVE_DATA,
            data: data
        });
    }
};
