'use strict';

var DEBUG = false;
var _name = 'SuiteOrderElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuiteOrderItemElement from '../../components/order/SuiteOrderItemElement';

class SuiteOrderElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            orders: props.orders,
            customer: props.customer
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var row = {
            marginTop: '20px',
            marginLeft: '0px',
            marginRight: '0px',
            marginBottom: '0px'
        }

        var {orders} = this.state;

        return (
            <div className="row" style={row}>
                {this.getOrderItems(orders)}
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
            orders: nextProps.orders,
            suite: nextProps.suite,
            customer: nextProps.customer
        });
    }

    // Build new array of menu item elements
    getOrderItems(orders) {
        var noOrdersFound = {
            textAlign: 'center',
            fontSize: '50px',
            color: '#dddddd',
            marginTop: '200px'
        }

        var {customer, suite} = this.state;

        if (orders.length > 0) {
            return orders.map((item, index) => {
                if (DEBUG) {
                    console.log('[*] ' + _name + ':render-map-menu ---');
                    console.log(item);
                }

                return (
                    <SuiteOrderItemElement customer={customer} item={item} key={item.id} suite={suite}/>
                );
            }, this);
        } else {
            return (
                <div style={noOrdersFound}>
                    No Orders Found
                </div>
            )
        }
    }

}

export default SuiteOrderElement;
