'use strict';

var DEBUG = false;
var _name = 'SuiteCartSubmitElement.jsx';

import React from 'react';
import {Component} from 'react';
import AppConfig from '../../config.js';

import SuiteCartSubmitPopupElement from '../../components/cart/SuiteCartSubmitPopupElement';
import SuiteCartSubmitPinPopupElement from '../../components/cart/SuiteCartSubmitPinPopupElement';

class SuiteCartSubmitElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place,
            suite: props.suite,
            customer: props.customer,
            cart: props.cart
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var buttonStyle = {
            width: '100%',
            marginTop: '10px'
        }

        var {customer, suite, place, cart} = this.state;

        var submitPopupStyle = {...buttonStyle};
        var submitPinPopupStyle = {...buttonStyle};

        // Determine popup element to display when user clicks submit
        if (place.KioskSetting.order_require_pin === '1') {
            submitPopupStyle = {...submitPopupStyle, display: 'none'}
        } else {
            submitPinPopupStyle = {...submitPinPopupStyle, display: 'none'}
        }

        const className = 'waves-effect waves-light btn-large z-depth-1 green modal-trigger';

        if (cart.length === 0 || (cart.CartItems && cart.CartItems.length === 0)) {
            // Emtpy cart
            return (
                <a className={className} href="#" onClick={this._handleClickSubmitCart} style={buttonStyle}>Submit</a>
            );
        } else {
            return (
                <div>
                    <a className={className} href="#submitCartPopupModal" id="trigger-modal-submit" style={submitPopupStyle}>Submit</a>
                    <SuiteCartSubmitPopupElement customer={customer} suite={suite}/>
                    <a className={className} href="#submitCartPinPopupModal" id="trigger-modal-pin-submit" style={submitPinPopupStyle}>Submit</a>
                    <SuiteCartSubmitPinPopupElement customer={customer} suite={suite}/>
                </div>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillReceiveProps ---');
            console.log(' States:');
            console.log(this.state);
            console.log(' Props:');
            console.log(this.props);
        }

        this.setState({
            place: nextProps.place,
            suite: nextProps.suite,
            customer: nextProps.customer,
            cart: nextProps.cart
        });
    }

    // Handle when user clicks submit cart
    _handleClickSubmitCart(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickSubmitCart ---');
        }

        Materialize.toast('Cart is empty.', AppConfig.messageDelay);

        e.preventDefault();
    }
}
export default SuiteCartSubmitElement;
