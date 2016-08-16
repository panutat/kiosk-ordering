'use strict';

var DEBUG = false;
var _name = 'SuiteMenuItemElement.jsx';

import React from 'react';
import {Component} from 'react';

import MenuRequestActions from '../../actions/MenuRequestActions';
import SuiteMenuItemPopupElement from '../../components/menu/SuiteMenuItemPopupElement';

class SuiteMenuItemElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            item: props.item,
            customer: props.customer
        };

        this._handleItemClick = this._handleItemClick.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var container = {
            padding: '0 5px 0 5px'
        }
        var button = {
            marginBottom: '10px',
            display: 'block',
            color: '#000000',
            textAlign: 'center',
            borderTop: '1px solid #eeeeee',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var image = {
            display: 'block',
            width: '100%'
        }
        var title = {
            height: '45px',
            fontSize: '12px',
            margin: '0px',
            padding: '5px',
            lineHeight: '14px'
        }

        var {item, suite, customer} = this.state;

        if (item.PlaceMenuTree.type === 'group') {
            return (
                <div className="col m4 l2 waves-effect waves-light" style={container}>
                    <a className="z-depth-1" href="#" onClick={this._handleItemClick} style={button}>
                        <img className="responsive-img" src={item.PlaceMenuTree.thumbnail} style={image}/>
                        <p style={title}>{item.PlaceMenuTree.title}</p>
                    </a>
                </div>
            );
        } else {
            return (
                <div className="col m4 l2" style={container}>
                    <a className="waves-effect waves-light z-depth-1 modal-trigger" href={'#suiteMenuItemPopupModal' + item.PlaceMenuTree.id} id={'trigger-modal' + item.PlaceMenuTree.id} style={button}>
                        <img className="responsive-img" src={item.PlaceMenuTree.thumbnail} style={image}/>
                        <p style={title}>{item.PlaceMenuTree.title}</p>
                    </a>
                    <SuiteMenuItemPopupElement customer={customer} item={item} key={item.PlaceMenuTree.id} suite={suite}/>
                </div>
            );
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
            item: nextProps.item,
            customer: nextProps.customer
        });
    }

    // Handle when user clicks menu item
    _handleItemClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleItemClick ---');
        }

        var {item, suite} = this.state;

        if (item.PlaceMenuTree.type === 'group') {
            MenuRequestActions.fetchMenuByParentMenuId(suite.KioskStation.place_id, item.PlaceMenuTree.id);
        }

        e.preventDefault();
    }

}

export default SuiteMenuItemElement;
