'use strict';

var DEBUG = false;
var _name = 'SuitePinPopupElement.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import md5 from 'md5';
import AppConfig from '../config.js';

import RouteActions from '../actions/RouteActions';
import SuiteRequestActions from '../actions/SuiteRequestActions';
import LocalStoreApi from '../utilities/LocalStoreApi';
import SuiteStore from '../stores/SuiteStore';

class SuitePinPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            destination: props.destination,
            title: props.title
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
            height: '320px',
            maxHeight: '85%',
            minHeight: '320px',
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

        var {suite, destination, title} = this.state;

        return (
            <div className="modal modal-fixed-footer" id={'suitePinPopupModal' + suite.KioskStation.id} style={modal}>
                <div className="modal-content" style={content}>
                    <h4>{suite.KioskStation.name} {title}</h4>
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

        // Initialize suite PIN modal popup window
        $('#trigger-modal' + suite.KioskStation.id).leanModal({
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
            suite: nextProps.suite,
            destination: nextProps.destination,
            title: nextProps.title
        });
    }

    // Clear PIN field
    _clearPin(e) {
        e.target.value = '';
    }

    // Handle when user types in PIN
    _handlePinChange(e) {
        var {suite} = this.state;
        var pin = this.refs['pin' + suite.KioskStation.id];

        if (e.target.value.length === 4) {
            if (this._validatePin(e.target.value)) {
                $('#suitePinPopupModal' + suite.KioskStation.id).closeModal();
                var suite = SuiteStore.getSuite(suite.KioskStation.id)

                // Store suite in LocalStoreApi
                LocalStoreApi.setItem('suite', suite);

                if (this.state.destination === '/place') {
                    // Trigger suite reset if logging out
                    SuiteRequestActions.resetSuites(suite.KioskStation.place_id);
                }

                // Route to suite screen
                RouteActions.setRoute(this.state.destination);
            } else {
                // $('#suitePinPopupModal' + suite.KioskStation.id).closeModal();
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

    // Logic to check if entered PIN matches the suite PIN
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

export default SuitePinPopupElement;
