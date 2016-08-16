'use strict';

var DEBUG = false;
var _name = 'SuiteMenuItemDescriptionElement.jsx';

import React from 'react';
import {Component} from 'react';

class SuiteMenuItemDescriptionElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var space = {
            height: '10px'
        }
        var warning = {
            color: '#F44336'
        }

        var {item} = this.state;

        return (
            <div>
                <h5>{item.PlaceMenuTree.title}</h5>
                {this.getItemDescription(item)}
                {this.getItemCustom1Label(item)}
                {this.getItemCustom1Detail(item)}
                {this.getItemCustom2Label(item)}
                {this.getItemCustom2Detail(item)}
                {this.getItemPriceSpace(item)}
                <strong>Price</strong><br/>
                {this.getItemPrice(item)}
                {this.getItemAvailability(item)}
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
            item: nextProps.item
        });
    }

    // Build item description
    getItemDescription(item) {
        return item.PlaceMenuItem.description
            ? <div><strong>Description</strong><br/>{item.PlaceMenuItem.description}</div>
            : ''
    }

    // Build item custom label
    getItemCustom1Label(item) {
        var space = {
            height: '10px'
        }
        return item.PlaceMenuItem.custom_1_label
            ? <div><div style={space}></div><strong>{item.PlaceMenuItem.custom_1_label}</strong></div>
            : ''
    }

    // Build item custom detail
    getItemCustom1Detail(item) {
        return item.PlaceMenuItem.custom_1_detail
            ? item.PlaceMenuItem.custom_1_detail
            : ''
    }

    // Build item custom label 2
    getItemCustom2Label(item) {
        var space = {
            height: '10px'
        }
        return item.PlaceMenuItem.custom_2_label
            ? <div><div style={space}></div><strong>{item.PlaceMenuItem.custom_2_label}</strong></div>
            : ''
    }

    // Build item custom detail 2
    getItemCustom2Detail(item) {
        return item.PlaceMenuItem.custom_2_detail
            ? item.PlaceMenuItem.custom_2_detail
            : ''
    }

    // Build item pricing
    getItemPriceSpace(item) {
        var space = {
            height: '10px'
        }
        return (item.PlaceMenuItem.description || item.PlaceMenuItem.custom_1_label || item.PlaceMenuItem.custom_2_label)
            ? <div style={space}></div>
            : ''
    }
    getItemPrice(item) {
        if (item.PlaceMenuItem.unit_price && item.PlaceMenuItem.unit_price > 0) {
            return (
                <h4>{'$' + item.PlaceMenuItem.unit_price}</h4>
            )
        } else {
            return (
                <h4>No Charge</h4>
            )
        }
    }

    // Build item availability
    getItemAvailability(item) {
        var warning = {
            color: '#F44336'
        }

        if (item.PlaceMenuSetting && item.PlaceMenuSetting.display_available_qty === '1') {
            if (item.PlaceMenuTree.daily_item_qty_remaining != 9999 && item.PlaceMenuTree.daily_item_qty_remaining > 0) {
                return (
                    <div>
                        <strong>Quantity Available</strong><br/>
                        <h4>{item.PlaceMenuTree.daily_item_qty_remaining}</h4>
                    </div>
                );
            } else if (item.PlaceMenuTree.daily_item_qty_remaining <= 0) {
                return (
                    <div>
                        <strong>Quantity Available</strong><br/>
                        <div style={warning}>{item.PlaceMenuSetting.sold_out_message}</div>
                    </div>
                );
            }
        }
    }

}

export default SuiteMenuItemDescriptionElement;
