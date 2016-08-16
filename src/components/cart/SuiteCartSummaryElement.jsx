'use strict';

var DEBUG = false;
var _name = 'SuiteCartSummaryElement.jsx';

import React from 'react';
import {Component} from 'react';

import MathApi from '../../utilities/MathApi';

class SuiteCartSummaryElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: props.cart,
            checkout: props.checkout
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var tableStyle = {
            fontSize: '13px'
        }
        var minPadding = {
            padding: '2px 15px 2px 15px'
        }
        var minPaddingTop = {
            padding: '10px 15px 2px 15px'
        }
        var total = {
            fontSize: '15px',
            fontWeight: 'bold'
        }
        var right = {
            textAlign: 'right'
        }

        var {cart, checkout} = this.state;

        var that = this;

        return (
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td style={minPaddingTop}>Subtotal</td>
                        <td style={Object.assign({}, minPaddingTop, right)}>{'$' + MathApi.formatMoney(checkout.subtotal)}</td>
                    </tr>
                    {function() {
                        if (checkout.tax.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>{checkout.tax.name}</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.tax.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (checkout.gratuity.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>{checkout.gratuity.name}</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.gratuity.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (checkout.additional_gratuity.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>{checkout.additional_gratuity.name}</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.additional_gratuity.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (cart.dasdak_fee_payer === 'B' && checkout.dasdak_fee.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>Dasdak Fee</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.dasdak_fee.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (checkout.service.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>{checkout.service.name}</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.service.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (checkout.delivery.amount > 0) {
                            return (
                                <tr>
                                    <td style={minPadding}>{checkout.delivery.name}</td>
                                    <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.delivery.amount)}</td>
                                </tr>
                            );
                        }
                    }.call()}
                    {function() {
                        if (checkout.PlaceMenuFee && that.getFeeList(checkout).length > 0) {
                            return that.getFeeList(checkout);
                        }
                    }.call()}
                    {function() {
                        return (
                            <tr style={total}>
                                <td style={minPadding}>Total</td>
                                <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout.total)}</td>
                            </tr>
                        );
                    }.call()}
                </tbody>
            </table>
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
            cart: nextProps.cart,
            checkout: nextProps.checkout
        });
    }

    // Build new array of table rows of order fees
    getFeeList(checkout) {
        return checkout.PlaceMenuFee.map((fee, index) => {
            if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-checkout-PlaceMenuFee ---');
                console.log(fee);
            }

            var minPadding = {
                padding: '2px 15px 2px 15px'
            }
            var right = {
                textAlign: 'right'
            }

            if (checkout[fee.id].amount > 0) {
                return (
                    <tr key={fee.id}>
                        <td style={minPadding}>{checkout[fee.id].name}</td>
                        <td style={Object.assign({}, minPadding, right)}>{'$' + MathApi.formatMoney(checkout[fee.id].amount)}</td>
                    </tr>
                );
            }
        }, this);
    }

}

export default SuiteCartSummaryElement;
