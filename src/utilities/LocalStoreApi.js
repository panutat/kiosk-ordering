/**
 * Place API
 */
'use strict';

module.exports = {
    // Get item from storage
    getItem(key) {
        var object = JSON.parse(localStorage.getItem(key));
        return object;
    },

    // Set item to storage
    setItem(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    },

    // Remove item from storage
    removeItem(key) {
        localStorage.removeItem(key);
    }

};
