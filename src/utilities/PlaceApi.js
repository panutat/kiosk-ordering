/**
 * Place API
 */
'use strict';

var DEBUG = false;
var _name = 'PlaceApi.js';

import PlaceResponseActions from '../actions/PlaceResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get place by place id
    initPlaceDataByPlaceId(placeId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getPlaceByPlaceId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                placeId: placeId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initPlaceDataByPlaceId --- ');
                    console.log(res);
                }
                PlaceResponseActions.receivePlace(res);
            });
    }

};
