/**
 * Cart API
 */
'use strict';

var DEBUG = false;
var _name = 'MenuApi.js';

import MenuResponseActions from '../actions/MenuResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get menu by place id
    initMenuDataByPlaceId(placeId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getMenuNodesByPlaceId`)
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
                    console.log('[*] ' + _name + ':initMenuDataByPlaceId --- ');
                    console.log(res);
                }
                MenuResponseActions.receiveMenu(res);
            });
    },

    // Get menu by parent menu id
    initMenuDataByParentMenuId(placeId, parentMenuId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getMenuNodesByParentId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                placeId: placeId,
                parentMenuId: parentMenuId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initMenuDataByParentMenuId --- ');
                    console.log(res);
                }
                MenuResponseActions.receiveMenu(res);
            });
    },

    // Get menu by child menu id
    initMenuDataByChildMenuId(placeId, childMenuId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getMenuNodesByChildId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                placeId: placeId,
                childMenuId: childMenuId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initMenuDataByChildMenuId --- ');
                    console.log(res);
                }
                MenuResponseActions.receiveMenu(res);
            });
    }
};
