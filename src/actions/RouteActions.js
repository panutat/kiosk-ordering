/**
 * Route Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

var AppActions = {
    // Set route
    setRoute(data) {
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.SET_CURRENT_ROUTE,
            route: data
        });
    }
};

export default AppActions;
