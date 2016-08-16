/**
 * Suite Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import SuiteApi from '../utilities/SuiteApi';

module.exports = {
    // Get all suites by suite id
    fetchSuitesBySuiteId(suiteId) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITES_REQUEST_DATA,
            data: suiteId
        });
        SuiteApi.initSuitesDataBySuiteId(suiteId);
    },
    // Get all suites by place id
    fetchSuites(placeId) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITES_REQUEST_DATA,
            data: placeId
        });
        SuiteApi.initSuitesDataByPlaceId(placeId);
    },
    // Get suite by suite id
    fetchSuite(suiteId) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITE_REQUEST_DATA,
            data: suiteId
        });
        SuiteApi.initSuiteDataBySuiteId(suiteId);
    },
    // Send suite reset call to pusher by place id
    resetSuites(placeId) {
        AppDispatcher.handleSuiteAction({
            actionType: ActionConstants.SUITES_RESET_DATA,
            data: placeId
        });
        SuiteApi.resetSuiteByPlaceId(placeId);
    }
};
