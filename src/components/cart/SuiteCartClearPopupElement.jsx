'use strict';

var DEBUG = false;
var _name = 'SuiteCartClearPopupElement.jsx';

import React from 'react';
import {Component} from 'react';

import RouteActions from '../../actions/RouteActions';
import CartRequestActions from '../../actions/CartRequestActions';

class SuiteCartClearPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: props.customer,
            suite: props.suite
        };

        this._handleClickCancel = this._handleClickCancel.bind(this);
        this._handleClickClearCart = this._handleClickClearCart.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var modal = {
            width: '35%',
            height: '320px',
            maxHeight: '85%',
            minHeight: '320px',
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
            <div className="modal modal-fixed-footer" id="clearCartPopupModal" style={modal}>
                <div className="modal-content" style={content}>
                    <h4>Clear Cart</h4>
                    <h5>All items will be removed. Are you sure you want to clear your cart?</h5>
                    <i>To remove a single item, click on the edit button next to the item and click Remove Item(s).</i>
                </div>
                <div className="modal-footer" style={footer}>
                    <a className="modal-action modal-close waves-effect waves-light z-depth-1 green btn" onClick={this._handleClickClearCart}>Yes</a>
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

        // Initialize clear cart modal popup window
        $('#trigger-modal-clear').leanModal({
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

    // Handle when user clicks clear cart
    _handleClickClearCart(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickClearCart ---');
        }

        var {customer, suite} = this.state;

        CartRequestActions.clearCartByCustomerId(customer.User.id, suite.KioskStation.id);

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

export default SuiteCartClearPopupElement;
