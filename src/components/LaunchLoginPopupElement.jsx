'use strict';

var DEBUG = false;
var _name = 'LaunchLoginPopupElement.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import AppConfig from '../config.js';

import RouteActions from '../actions/RouteActions';
import SessionRequestActions from '../actions/SessionRequestActions';

class LaunchLoginPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place
        };

        this._handleClickCancel = this._handleClickCancel.bind(this);
        this._handleClickLogin = this._handleClickLogin.bind(this);
        this._handleKeyUp = this._handleKeyUp.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var modal = {
            width: '35%',
            height: '360px',
            maxHeight: '85%',
            minHeight: '360px',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var content = {
            padding: '30px'
        }
        var form = {
            padding: '20px 0px'
        }
        var footer = {
            backgroundColor: '#eeeeee',
            height: '70px',
            padding: '10px 30px'
        }
        var cancel = {
            marginRight: '20px'
        }
        var input = {
            fontSize: '26px'
        }

        return (
            <div className="modal modal-fixed-footer" id="launchLoginPopupModal" style={modal}>
                <div className="modal-content" style={content}>
                    <h4>Login</h4>
                    <form className="col s12" style={form}>
                        <div className="input-field">
                            <i className="large material-icons prefix">account_circle</i>
                            <input id="username" onKeyUp={this._handleKeyUp} ref="username" style={input} type="text"/>
                            <label className="active" data-error="wrong" htmlFor="username">Enter Username</label>
                        </div>
                        <div className="input-field">
                            <i className="large material-icons prefix">lock_open</i>
                            <input id="password" onKeyUp={this._handleKeyUp} ref="password" style={input} type="password"/>
                            <label className="active" data-error="wrong" htmlFor="password">Enter Password</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer" style={footer}>
                    <a className="modal-action waves-effect waves-light z-depth-1 green btn" onClick={this._handleClickLogin}>Login</a>
                    <a className="modal-action modal-close waves-effect waves-light z-depth-1 orange darken-4 btn" id="cancel" onClick={this._handleClickCancel} style={cancel}>Cancel</a>
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

        var username = this.refs['username'];
        var password = this.refs['password'];

        // Initialize user login modal popup window
        $('#trigger-modal').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .6, // Opacity of modal background
            in_duration: 150, // Transition in duration
            out_duration: 100, // Transition out duration
            ready() {
                ReactDOM.findDOMNode(password).value = '';
                ReactDOM.findDOMNode(username).value = '';
                ReactDOM.findDOMNode(username).focus();
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
            place: nextProps.place
        });
    }

    // Handle when user types into field
    _handleKeyUp(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleKeyUp ---');
        }

        if (e.keyCode === 13) {
            var username = this.refs['username'];
            var password = this.refs['password'];

            $('#launchLoginPopupModal').closeModal();

            setTimeout(() => {
                SessionRequestActions.fetchSession(ReactDOM.findDOMNode(username).value, ReactDOM.findDOMNode(password).value);
            }, AppConfig.loadingDelay / 1.5);
        }

        e.preventDefault();
    }

    // Handle when user clicks login
    _handleClickLogin(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickLogin ---');
        }

        var username = this.refs['username'];
        var password = this.refs['password'];

        $('#launchLoginPopupModal').closeModal();

        setTimeout(() => {
            SessionRequestActions.fetchSession(ReactDOM.findDOMNode(username).value, ReactDOM.findDOMNode(password).value);
        }, AppConfig.loadingDelay / 1.5);

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

export default LaunchLoginPopupElement;
