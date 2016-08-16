'use strict';

var DEBUG = false;
var _name = 'SuiteCartEditPopupElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuiteMenuItemDescriptionElement from '../../components/menu/SuiteMenuItemDescriptionElement';
import SuiteCartItemActionElement from '../../components/cart/SuiteCartItemActionElement';
import SuiteMenuItemImagesElement from '../../components/menu/SuiteMenuItemImagesElement';

class SuiteCartEditPopupElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            customer: props.customer,
            suite: props.suite
        };

        this._handleClickCancel = this._handleClickCancel.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var modal = {
            width: '80%',
            height: '560px',
            maxHeight: '85%',
            minHeight: '500px',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var content = {
            padding: '30px'
        }
        var image = {
            display: 'block',
            maxHeight: '420px',
            margin: 'auto',
            width: '100%',
            borderRadius: '5px',
            overflow: 'hidden'
        }
        var footer = {
            backgroundColor: '#eeeeee',
            height: '70px',
            padding: '10px 30px'
        }

        var {item, customer, suite} = this.state;

        return (
            <div className="modal modal-fixed-footer" id={'suiteCartEditPopupModal' + item.id} style={modal}>
                <div className="modal-content" style={content}>
                    <div className="row">
                        <div className="col m3 l5 center-align">
                            <SuiteMenuItemImagesElement item={item}/>
                        </div>
                        <div className="col m4 l4">
                            <SuiteMenuItemDescriptionElement item={item}/>
                        </div>
                        <div className="col m5 l3">
                            <SuiteCartItemActionElement customer={customer} item={item} suite={suite}/>
                        </div>
                    </div>
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

        var {item} = this.state;

        // Initialize cart item edit modal popup window
        $('#trigger-modal' + item.id).leanModal({
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
            item: nextProps.item,
            customer: nextProps.customer,
            suite: nextProps.suite
        });
    }

    _handleClickCancel(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleClickCancel ---');
        }

        e.preventDefault();
    }

}

export default SuiteCartEditPopupElement;
