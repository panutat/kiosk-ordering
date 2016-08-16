'use strict';

var DEBUG = false;
var _name = 'SuiteCartSubmitPopupElement.jsx';

import React from 'react';
import {Component} from 'react';

import RouteActions from '../../actions/RouteActions';
import CartRequestActions from '../../actions/CartRequestActions';

class SuiteCartSubmitPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: props.customer,
            suite: props.suite
        };

        this._handleClickCancel = this._handleClickCancel.bind(this);
        this._handleClickSubmitCart = this._handleClickSubmitCart.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var modal = {
            width: '35%',
            height: '250px',
            maxHeight: '85%',
            minHeight: '250px',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var content = {
            padding: '30px'
        }
        var footer = {
            backgroundColor: '#eeeeee',
            height: '70px',
            padding: '10px 30px'
        }
        var cancel = {
            marginRight: '20px'
        }

        return (
            <div className="modal modal-fixed-footer" id="submitCartPopupModal" style={modal}>
                <div className="modal-content" style={content}>
                    <h4>Submit Order</h4>
                    <h5>Are you sure you want to submit this order?</h5>
                </div>
                <div className="modal-footer" style={footer}>
                    <a className="modal-action modal-close waves-effect waves-light z-depth-1 green btn" onClick={this._handleClickSubmitCart}>Yes</a>
                    <a className="modal-action modal-close waves-effect waves-light z-depth-1 orange darken-4 btn" onClick={this._handleClickCancel} style={cancel}>No</a>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentDidMount ---');
            console.log(' States:');
            console.log(this.state);
            console.log(' Props:');
            console.log(this.props);
        }

        // Initialize cart submit modal popup window
        $('#trigger-modal-submit').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .6, // Opacity of modal background
            in_duration: 150, // Transition in duration
            out_duration: 100, // Transition out duration
            ready() {}, // Callback for Modal open
            complete() {} // Callback for Modal close
        });
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
            suite: nextProps.suite,
            customer: nextProps.customer
        });
    }

    // Handle when user clicks submit cart
    _handleClickSubmitCart(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickSubmitCart ---');
        }

        var {customer, suite} = this.state;

        CartRequestActions.submitCartByCustomerId(customer.User.id, suite.KioskStation.id);

        e.preventDefault();
    }

    // Handle when user clicks cancel
    _handleClickCancel(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickCancel ---');
        }

        e.preventDefault();
    }

}

export default SuiteCartSubmitPopupElement;
