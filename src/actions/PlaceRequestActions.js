/**
 * Place Request Actions
 */
'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionTypes';
import PlaceApi from '../utilities/PlaceApi';

module.exports = {
    // Get place data by place id
    fetchPlace(placeId) {
        AppDispatcher.handlePlaceAction({
            actionType: ActionConstants.PLACE_REQUEST_DATA,
            data: placeId
        });
        PlaceApi.initPlaceDataByPlaceId(placeId);
    }
};
