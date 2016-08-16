'use strict';

var DEBUG = false;
var _name = 'SuiteMenuElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuiteMenuItemElement from '../../components/menu/SuiteMenuItemElement';

class SuiteMenuElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            menu: props.menu,
            customer: props.customer
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var row = {
            marginTop: '15px',
            marginLeft: '0px',
            marginRight: '0px',
            marginBottom: '0px'
        }

        var {menu} = this.state;

        return (
            <div className="row" style={row}>
                {this.getMenuItems(menu)}
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
            menu: nextProps.menu,
            suite: nextProps.suite,
            customer: nextProps.customer
        });
    }

    // Build new array of menu item elements
    getMenuItems(menu) {
        var {customer, suite} = this.state;

        return menu.map((item, index) => {
            if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-menu ---');
                console.log(menu);
            }

            return (
                <SuiteMenuItemElement customer={customer} item={item} key={item.PlaceMenuTree.id} suite={suite}/>
            );
        }, this);
    }

}

export default SuiteMenuElement;
