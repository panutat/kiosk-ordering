/**
 * Suite API
 */
'use strict';

var DEBUG = false;
var _name = 'SuiteApi.js';

import SuiteResponseActions from '../actions/SuiteResponseActions';
import Request from 'superagent';
import AppConfig from '../config.js';

module.exports = {
    // Get all suites by place id
    initSuitesDataByPlaceId(placeId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getSuitesByPlaceId`)
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
                    console.log('[*] ' + _name + ':initSuitesDataByPlaceId --- ');
                    console.log(res);
                }
                SuiteResponseActions.receiveSuites(res);
            });
    },

    // Get all suites by suite id
    initSuitesDataBySuiteId(suiteId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getSuitesBySuiteId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                suiteId: suiteId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initSuitesDataBySuiteId --- ');
                    console.log(res);
                }
                SuiteResponseActions.receiveSuites(res);
            });
    },

    // Get suite by suite id
    initSuiteDataBySuiteId(suiteId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/getSuiteBySuiteId`)
            .type('application/json')
            .accept('json')
            .set({
                'X-Requested-With': 'XMLHttpRequest'
            })
            .query({
                suiteId: suiteId
            })
            .end((err, res) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':initSuiteDataBySuiteId --- ');
                    console.log(res);
                }
                SuiteResponseActions.receiveSuite(res);
            });
    },

    // Sent reset trigger for pusher for all suites by place id
    resetSuiteByPlaceId(placeId) {
        Request
            .get(`//${AppConfig.hostName}/kiosk/resetSuiteByPlaceId`)
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
                    console.log('[*] ' + _name + ':resetSuiteByPlaceId --- ');
                    console.log(res);
                }
            });
    }
};
