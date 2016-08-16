'use strict';

var DEBUG = false;
var _name = 'OrdersNavElement.jsx';

import React from 'react';
import {Component} from 'react';

import RouteActions from '../actions/RouteActions';
import OrderRequestActions from '../actions/OrderRequestActions';

class OrdersNavElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place,
            suite: props.suite,
            customer: props.customer
        };

        this._handleHomeClick = this._handleHomeClick.bind(this);
        this._handleOrdersClick = this._handleOrdersClick.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var navButtonStyle = {
            marginRight: '10px',
            height: '45px',
            lineHeight: '45px'
        }
        var navButtonStyleRight = {
            height: '45px',
            lineHeight: '45px'
        }

        return (
            <div>
                <a className='waves-effect waves-light btn z-depth-1 red darken-4' href='#' onClick={this._handleHomeClick} style={navButtonStyle}>
                    <i className="material-icons left">home</i>Menu
                </a>
                <a className='waves-effect waves-light btn z-depth-1 red darken-4 hide-on-med-and-down disabled' style={navButtonStyle}>
                    <i className="material-icons left">view_module</i>Categories
                </a>
                <a className='waves-effect waves-light btn z-depth-1 red darken-4' href='#' onClick={this._handleOrdersClick} style={navButtonStyle}>
                    <i className="material-icons left">shopping_cart</i>Orders
                </a>
                <a className={'waves-effect waves-light btn z-depth-1 red darken-4 right disabled'} href='#' onClick={this._handleBackClick} style={navButtonStyleRight}>
                    <i className="material-icons">reply</i>
                </a>
            </div>
        );
    }

    componentWillUnmount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillUnmount ---');
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
            suite: nextProps.suite,
            place: nextProps.place,
            customer: nextProps.customer
        });
    }

    // Handle when user clicks home
    _handleHomeClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleHomeClick ---');
        }

        RouteActions.setRoute('/suite');

        e.preventDefault();
    }

    // Handle when user clicks orders
    _handleOrdersClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleOrdersClick ---');
        }

        var {customer, suite} = this.state;

        OrderRequestActions.fetchOrdersByCustomerId(customer.User.id, suite.KioskStation.id);

        e.preventDefault();
    }

    // Handle when user clicks back
    _handleBackClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleBackClick ---');
        }

        e.preventDefault();
    }

}

export default OrdersNavElement;
