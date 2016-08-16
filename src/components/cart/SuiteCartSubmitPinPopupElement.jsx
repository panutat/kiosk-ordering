'use strict';

var DEBUG = false;
var _name = 'SuiteCartSubmitPinPopupElement.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import md5 from 'md5';
import AppConfig from '../../config.js';

import RouteActions from '../../actions/RouteActions';
import CartRequestActions from '../../actions/CartRequestActions';
import LocalStoreApi from '../../utilities/LocalStoreApi';
import SuiteStore from '../../stores/SuiteStore';

class SuiteCartSubmitPinPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: props.customer,
            suite: props.suite
        };

        this._clearPin = this._clearPin.bind(this);
        this._handlePinChange = this._handlePinChange.bind(this);
        this._handleClickCancel = this._handleClickCancel.bind(this);
        this._validatePin = this._validatePin.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var modal = {
            width: '35%',
            height: '350px',
            maxHeight: '85%',
            minHeight: '350px',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var content = {
            padding: '30px'
        }
        var form = {
            padding: '20px 0px'
        }
        var input = {
            fontSize: '30px'
        }
        var footer = {
            backgroundColor: '#eeeeee',
            height: '70px',
            padding: '10px 30px'
        }

        var {suite, customer} = this.state;

        return (
            <div className="modal modal-fixed-footer" id="submitCartPinPopupModal" style={modal}>
                <div className="modal-content" style={content}>
                    <h4>Order Confirmation</h4>
                    <h5>Enter Security PIN to confirm.</h5>
                    <form className="col s12" style={form}>
                        <div className="input-field">
                            <i className="large material-icons prefix">vpn_key</i>
                            <input id="pin" maxLength="4" onClick={this._clearPin} onKeyUp={this._handlePinChange} ref={'pin' + suite.KioskStation.id} style={input} type="password"/>
                            <label className="active" data-error="wrong" htmlFor="pin">Enter Security PIN</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer" style={footer}>
                    <a className="modal-action modal-close waves-effect waves-light z-depth-1 orange darken-4 btn" onClick={this._handleClickCancel}>Cancel</a>
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

        var {suite} = this.state;

        var pin = this.refs['pin' + suite.KioskStation.id];

        // Initialize PIN entry model popup window
        $('#trigger-modal-pin-submit').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .6, // Opacity of modal background
            in_duration: 150, // Transition in duration
            out_duration: 100, // Transition out duration
            ready() {
                ReactDOM.findDOMNode(pin).value = '';
                ReactDOM.findDOMNode(pin).focus();
            }, // Callback for Modal open
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
            customer: nextProps.customer,
            suite: nextProps.suite
        });
    }

    // Handle clearing of PIN field
    _clearPin(e) {
        e.target.value = '';
    }

    // Handle when user types the PIN
    _handlePinChange(e) {
        var {suite, customer} = this.state;

        var pin = this.refs['pin' + suite.KioskStation.id];

        if (e.target.value.length === 4) {
            if (this._validatePin(e.target.value)) {
                $('#submitCartPinPopupModal').closeModal();
                var suite = SuiteStore.getSuite(suite.KioskStation.id)

                // Store suite in LocalStoreApi
                LocalStoreApi.setItem('suite', suite);

                // Submit order
                CartRequestActions.submitCartByCustomerId(customer.User.id, suite.KioskStation.id);
            } else {
                //$('#submitCartPinPopupModal').closeModal();
                ReactDOM.findDOMNode(pin).value = '';
                ReactDOM.findDOMNode(pin).focus();

                Materialize.toast('Incorrect PIN. Please try again.', AppConfig.messageDelay);
            }
        }

        e.preventDefault();
    }

    // Handle when user clicks cancel
    _handleClickCancel(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickCancel ---');
        }

        e.preventDefault();
    }

    // Check to see if PIN entered matches the suite PIN
    _validatePin(pin) {
        var {suite} = this.state;

        var pinMatch = false;

        suite.KioskStationPin.map((element, index) => {
            var hash = md5(pin);
            if (element.pin === hash) {
                pinMatch = true;
            }
        });

        return pinMatch;
    }

}

export default SuiteCartSubmitPinPopupElement;
