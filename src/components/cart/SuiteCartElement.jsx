'use strict';

var DEBUG = false;
var _name = 'SuiteCartElement.jsx';

import React from 'react';
import {Component} from 'react';
import AppConfig from '../../config.js';

import SuiteCartItemElement from '../../components/cart/SuiteCartItemElement';
import SuiteCartClearPopupElement from '../../components/cart/SuiteCartClearPopupElement';
import SuiteCartSummaryElement from '../../components/cart/SuiteCartSummaryElement';
import SuiteCartSubmitElement from '../../components/cart/SuiteCartSubmitElement';

class SuiteCartElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place,
            suite: props.suite,
            customer: props.customer,
            cart: props.cart,
            cartItems: props.cartItems,
            checkout: props.checkout
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
        var center = {
            textAlign: 'center'
        }
        var summary = {
            marginTop: '10px'
        }

        var {cart, cartItems, checkout, suite, place, customer} = this.state;

        return (
            <div>
                <table className="striped">
                    <thead>
                        <tr>
                            <th data-field="qty" width="1%">Qty</th>
                            <th data-field="item" width="98%">Item</th>
                            <th data-field="price" width="1%">Price</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getCartItemsList(cartItems).length > 0
                                ? this.getCartItemsList(cartItems)
                                : <tr><td colSpan="4" style={center}>Cart Empty</td></tr>
                        }
                    </tbody>
                </table>
                {
                    checkout
                        ? <SuiteCartSummaryElement cart={cart.Cart} checkout={checkout}/>
                        : ''
                }
                <div className="row" style={summary}>
                    <div className="col l6">
                        <SuiteCartSubmitElement customer={customer} suite={suite} place={place} cart={cart}/>
                    </div>
                    <div className="col l6">
                        {
                            cart.length === 0 || (cart.CartItems && cart.CartItems.length === 0)
                                ?   <a className="waves-effect waves-light btn-large z-depth-1 grey darken-1 modal-trigger" href="#" onClick={this._handleClickClearCart} style={buttonStyle}>Clear</a>
                                :   <div>
                                        <a className="waves-effect waves-light btn-large z-depth-1 grey darken-1 modal-trigger" href="#clearCartPopupModal" id="trigger-modal-clear" style={buttonStyle}>Clear</a>
                                        <SuiteCartClearPopupElement customer={customer} suite={suite}/>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        );
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
            cart: nextProps.cart,
            cartItems: nextProps.cartItems,
            checkout: nextProps.checkout
        });
    }

    // Handle when user clicks clear cart
    _handleClickClearCart(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickClearCart ---');
        }

        Materialize.toast('Cart is empty.', AppConfig.messageDelay);

        e.preventDefault();
    }

    // Build array of cart item elements
    getCartItemsList(cartItems) {
        var {customer, suite} = this.state;
        return cartItems.map((item, index) => {
            if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-cartItems ---');
                console.log(item);
            }
            return (
                <SuiteCartItemElement customer={customer} item={item} key={item.id} suite={suite}/>
            );
        }, this);
    }

}

export default SuiteCartElement;
