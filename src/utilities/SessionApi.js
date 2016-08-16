/**
 * Place API
 */
'use strict';

var DEBUG = false;
var _name = 'SessionApi.js';

import SessionResponseActions from '../actions/SessionResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get session by username and password
    initSessionData(username, password) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getSession`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                username: username,
                password: password
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initSessionData --- ');
                    console.log(res);
                }
                SessionResponseActions.receiveSession(res);
            });
    }

};
