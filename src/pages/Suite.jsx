'use strict';

var DEBUG = false;
var _name = 'Suite.jsx';

import React from 'react';
import {Component} from 'react';
import AppConfig from '../config.js';

import RouteActions from '../actions/RouteActions';
import CartStore from '../stores/CartStore';
import SuiteStore from '../stores/SuiteStore';
import PlaceStore from '../stores/PlaceStore';
import MenuStore from '../stores/MenuStore';
import PlaceRequestActions from '../actions/PlaceRequestActions';
import SuiteRequestActions from '../actions/SuiteRequestActions';
import MenuRequestActions from '../actions/MenuRequestActions';
import CartRequestActions from '../actions/CartRequestActions';

import LocalStoreApi from '../utilities/LocalStoreApi';

var DefaultLayout = React.createFactory(require('../layouts/Default'));
var SuiteNavElement = React.createFactory(require('../components/SuiteNavElement'));
var SuiteDisabledElement = React.createFactory(require('../components/SuiteDisabledElement'));
var SuiteCartHeaderElement = React.createFactory(require('../components/cart/SuiteCartHeaderElement'));
var SuiteMenuElement = React.createFactory(require('../components/menu/SuiteMenuElement'));
var SuiteCartElement = React.createFactory(require('../components/cart/SuiteCartElement'));

function getPlaceState() {
    var place = PlaceStore.getPlace();

    // If null try to get from LocalStoreApi
    if (place === null || Object.keys(place).length === 0) {
        if (LocalStoreApi.getItem('place')) {
            place = LocalStoreApi.getItem('place');
            PlaceRequestActions.fetchPlace(place.Place.id);
        } else {
            // Redirect route to Place screen
            RouteActions.setRoute('/place');
        }
    }

    return place;
}

function getCustomerState() {
    var suite = SuiteStore.getSuite();

    // If null try to get from LocalStoreApi
    if (Object.keys(suite).length === 0) {
        if (LocalStoreApi.getItem('suite')) {
            suite = LocalStoreApi.getItem('suite');
            SuiteStore.setSuite(suite);
        } else {
            // Redirect route to Place screen
            RouteActions.setRoute('/place');
        }
    }

    return {
        User: suite.Admin
    };
}

function getSuiteState() {
    var suite = SuiteStore.getSuite();

    // If null try to get from LocalStoreApi
    if (Object.keys(suite).length === 0) {
        if (LocalStoreApi.getItem('suite')) {
            suite = LocalStoreApi.getItem('suite');
            suiteId = suite.KioskStation.id;
            SuiteRequestActions.fetchSuite(suiteId);
        } else {
            // Redirect route to Place screen
            RouteActions.setRoute('/place');
        }
    } else {
        suiteId = suite.KioskStation.id;
    }

    return suite
}

function getMenuState() {
    return MenuStore.getMenu();
}

function getCartState() {
    return CartStore.getCart();
}

function getCartMessage() {
    return CartStore.getMessage();
}

class Suite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            suiteId: suiteId,
            suite: getSuiteState(),
            customer: getCustomerState(),
            place: getPlaceState(),
            menu: [],
            cart: [],
            cartItems: [],
            checkout: null
        };

        this._placeChange = this._placeChange.bind(this);
        this._suiteChange = this._suiteChange.bind(this);
        this._menuChange = this._menuChange.bind(this);
        this._cartChange = this._cartChange.bind(this);

        PlaceStore.addChangeListener(this._placeChange);
        SuiteStore.addChangeListener(this._suiteChange);
        MenuStore.addChangeListener(this._menuChange);
        CartStore.addChangeListener(this._cartChange);
    }

    render() {
        var elementStyle = {
            height: '100%'
        };
        var menuStyle = {
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%'
        };
        var cartDisabled = {
            textAlign: 'center',
            padding: '150px 0px',
            backgroundColor: '#f3f3f3',
            color: '#dddddd',
            marginTop: '20px',
            fontSize: '20px',
            height: '80%'
        }

        var {place, customer, suite, menu, cart, cartItems, checkout} = this.state;

        return (
            <div className="row" style={elementStyle}>
            {
                (place.KioskSetting.enable_kiosk === '1' && suite.KioskStation.enabled === '1')
                    ?   <div style={elementStyle}>
                            <div className="col m7 l9" style={menuStyle}>
                                <SuiteNavElement place={place}/>
                                <SuiteMenuElement customer={customer} menu={menu} suite={suite}/>
                            </div>
                            <div className="cart col m5 l3" style={menuStyle}>
                                <SuiteCartHeaderElement place={place} suite={suite}/>
                                <SuiteCartElement place={place} customer={customer} suite={suite} cart={cart} cartItems={cartItems} checkout={checkout}/>
                            </div>
                        </div>
                    :   <SuiteDisabledElement place={place} suite={suite}/>
            }
            </div>
        );
    }

    componentWillUnmount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillUnmount ---');
        }

        PlaceStore.removeChangeListener(this._placeChange);
        SuiteStore.removeChangeListener(this._suiteChange);
        MenuStore.removeChangeListener(this._menuChange);
        CartStore.removeChangeListener(this._cartChange);
    }

    componentDidMount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentDidMount ---');
            console.log(' States:');
            console.log(this.state);
            console.log(' Props:');
            console.log(this.props);
        }

        var {suite, customer} = this.state;

        MenuRequestActions.fetchMenuByPlaceId(suite.KioskStation.place_id);
        CartRequestActions.fetchCartByCustomerId(customer.User.id, suite.KioskStation.id);

        // Initialize dropdown
        $('.dropdown-button').dropdown({
            inDuration: 100,
            outDuration: 150,
            constrain_width: true, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true // Displays dropdown below the button
        });
    }

    // Update component state when place changes
    _placeChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_placeChange ---');
        }

        this.setState({
            place: getPlaceState()
        });
    }

    // Update component state when suite changes
    _suiteChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_suiteChange ---');
        }

        this.setState({
            suite: getSuiteState()
        });
    }

    // Update component state when menu changes
    _menuChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_menuChange ---');
        }

        this.setState({
            menu: getMenuState()
        });
    }

    // Update component state when cart changes
    _cartChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_cartChange ---');
        }

        var cart = getCartState();
        var message = getCartMessage();
        var cartItems = [];
        var checkout = null;

        if (message) {
            Materialize.toast(message, AppConfig.messageDelay);
        }

        if (cart.CartItems) {
            cartItems = cart.CartItems;
        }

        if (cart.Checkout) {
            checkout = cart.Checkout;
        }

        this.setState({
            cart: cart,
            cartItems: cartItems,
            checkout: checkout
        });
    }
}

Suite.defaultProps = {
    layout: DefaultLayout
};

export default Suite;
