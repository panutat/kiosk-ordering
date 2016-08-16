'use strict';

var DEBUG = false;
var _name = 'SuiteNavElement.jsx';

import React from 'react';
import {Component} from 'react';

import RouteActions from '../actions/RouteActions';
import MenuRequestActions from '../actions/MenuRequestActions';
import MenuStore from '../stores/MenuStore';

function getQuickMenuState() {
    return MenuStore.getQuickMenu();
}

function getMenuState() {
    return MenuStore.getMenu();
}

class SuiteNavElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place,
            quickMenu: [],
            menu: []
        };

        this._quickMenuChange = this._quickMenuChange.bind(this);
        this._handleHomeClick = this._handleHomeClick.bind(this);
        this._handleQuickMenuClick = this._handleQuickMenuClick.bind(this);
        this._handleBackClick = this._handleBackClick.bind(this);

        MenuStore.addChangeListener(this._quickMenuChange);
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

        var {menu, quickMenu, place} = this.state;

        // Check to see if we are at root menu and disable back button
        var backDisabled = '';
        menu.forEach((item) => {
            if (item.PlaceMenuTree.level === '1') {
                backDisabled = ' disabled';
            }
        });

        return (
            <div>
                <a className='waves-effect waves-light btn z-depth-1 red darken-4' href='#' onClick={this._handleHomeClick} style={navButtonStyle}>
                    <i className="material-icons left">home</i>Menu
                </a>
                <a className='dropdown-button waves-effect waves-light btn z-depth-1 red darken-4 hide-on-med-and-down' data-activates='dropdown' href='#' style={navButtonStyle}>
                    <i className="material-icons left">view_module</i>Categories
                </a>
                <ul className='dropdown-content' id='dropdown'>
                    {this.getQuickMenuItem(quickMenu)}
                </ul>
                {this.getOrdersButton(place)}
                <a className={'waves-effect waves-light btn z-depth-1 red darken-4 right' + backDisabled} href='#' onClick={this._handleBackClick} style={navButtonStyleRight}>
                    <i className="material-icons">reply</i>
                </a>
            </div>
        );
    }

    componentWillUnmount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillUnmount ---');
        }

        MenuStore.removeChangeListener(this._quickMenuChange);
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

    // Update component state when menu changes
    _quickMenuChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_quickMenuChange ---');
        }

        this.setState({
            quickMenu: getQuickMenuState(),
            menu: getMenuState()
        });
    }

    // Handle when user clicks home
    _handleHomeClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleHomeClick ---');
        }

        var {place} = this.state;

        MenuRequestActions.fetchMenuByPlaceId(place.Place.id);

        e.preventDefault();
    }

    // Handle when user clicks orders
    _handleOrdersClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleHomeClick ---');
        }

        RouteActions.setRoute('/orders');

        e.preventDefault();
    }

    // Handle when user clicks quick menu
    _handleQuickMenuClick(index, e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleQuickMenuClick ---');
        }

        var {place, quickMenu} = this.state;

        MenuRequestActions.fetchMenuByParentMenuId(place.Place.id, quickMenu[index].PlaceMenuTree.id);

        e.preventDefault();
    }

    // Handle when user clicks back
    _handleBackClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleBackClick ---');
        }

        var {menu, place} = this.state;

        if (menu.length > 0) {
            MenuRequestActions.fetchMenuByChildMenuId(place.Place.id, menu[0].PlaceMenuTree.parent_id);
        }

        e.preventDefault();
    }

    // Build order history nav button
    getOrdersButton(place) {
        var navButtonStyle = {
            marginRight: '10px',
            height: '45px',
            lineHeight: '45px'
        }

        if (place.KioskSetting.display_order_history === '1') {
            return (
                <a className='waves-effect waves-light btn z-depth-1 red darken-4' href='#' onClick={this._handleOrdersClick} style={navButtonStyle}>
                    <i className="material-icons left">shopping_cart</i>Orders
                </a>
            )
        } else {
            return '';
        }
    }

    // Build new array of quick menu item elements
    getQuickMenuItem(quickMenu) {
        return quickMenu.map((item, index) => {
            if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-quickMenu ---');
                console.log(item);
            }

            return (
                <li key={item.PlaceMenuTree.id}>
                    <a href="#" onClick={this._handleQuickMenuClick.bind(this, index)}>{item.PlaceMenuTree.title}</a>
                </li>
            );
        }, this);
    }

}

export default SuiteNavElement;
