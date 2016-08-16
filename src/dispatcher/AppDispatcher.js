/*
 * A singleton that operates as the central hub for application updates.
 * For more information visit https://facebook.github.io/flux/
 */

'use strict';

import Flux from 'flux';

var AppDispatcher = Object.assign(new Flux.Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction(action) {
        this.dispatch(action);
    },

    /**
     * Session Handler
     */
    handleSessionAction(action) {
        this.dispatch(action);
    },

    /**
     * Place Handler
     */
    handlePlaceAction(action) {
        this.dispatch(action);
    },

    /**
     * Suite Handler
     */
    handleSuiteAction(action) {
        this.dispatch(action);
    },

    /**
     * Cart Handler
     */
    handleCartAction(action) {
        this.dispatch(action);
    },

    /**
     * Menu Handler
     */
    handleMenuAction(action) {
        this.dispatch(action);
    },

});

export default AppDispatcher;
