'use strict';

var DEBUG = false;
var _name = 'SuiteCartItemActionElement.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

import MenuRequestActions from '../../actions/MenuRequestActions';
import CartRequestActions from '../../actions/CartRequestActions';

class SuiteCartItemActionElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            customer: props.customer,
            suite: props.suite
        };

        this._handleUpdateCartClick = this._handleUpdateCartClick.bind(this);
        this._handleDeleteItemCartClick = this._handleDeleteItemCartClick.bind(this);
        this._handleQtyMinus = this._handleQtyMinus.bind(this);
        this._handleQtyPlus = this._handleQtyPlus.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var qtyButton = {
            marginTop: '15px',
            borderRadius: '5px'
        }
        var qtyLabel = {
            margin: '15px 0px 0px',
            textAlign: 'center',
            width: '60px'
        }
        var update = {
            width: '100%',
            marginBottom: '10px'
        }
        var remove = {
            width: '100%'
        }

        var {item} = this.state;

        return (
            <div>
                <a className="left btn-floating btn-large waves-effect waves-light z-depth-1 red" onClick={this._handleQtyMinus} style={qtyButton}>
                    <i className="material-icons large">remove</i>
                </a>
                <div className="left" style={qtyLabel}>
                    Qty<br/>
                    <h4 ref={'qtyLabel' + item.PlaceMenuItem.id}>{item.quantity}</h4>
                    <input ref={'qty' + item.PlaceMenuItem.id} type="hidden" value={item.quantity}/>
                </div>
                <a className="left btn-floating btn-large waves-effect waves-light z-depth-1 green" onClick={this._handleQtyPlus} style={qtyButton}>
                    <i className="material-icons large">add</i>
                </a>
                {
                    item.PlaceMenuItem.allow_order_note === '1'
                        ? this._getNotesInput(item)
                        : <input ref={'notes' + item.PlaceMenuItem.id} type="hidden" value=""/>
                }
                <a className="waves-effect waves-light btn-large z-depth-1 green" onClick={this._handleUpdateCartClick} style={update}>
                    Update Cart
                </a>
                <a className="waves-effect waves-light btn-large z-depth-1 red" onClick={this._handleDeleteItemCartClick} style={remove}>
                    Remove Item(s)
                </a>
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
            item: nextProps.item,
            customer: nextProps.customer,
            suite: nextProps.suite
        });
    }

    // Build notes input field
    _getNotesInput(item) {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <textarea className="materialize-textarea" defaultValue={item.note} id={'notes' + item.PlaceMenuItem.id} placeholder={item.PlaceMenuItem.sample_note} ref={'notes' + item.PlaceMenuItem.id}></textarea>
                    <label className="active" htmlFor="textarea1">Order Notes</label>
                </div>
            </div>
        )
    }

    // Handle when user clicks (+) quantity
    _handleQtyPlus(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleQtyPlus ---');
        }

        var {item} = this.state;

        var qtyLabel = ReactDOM.findDOMNode(this.refs['qtyLabel' + item.PlaceMenuItem.id]);
        var qty = ReactDOM.findDOMNode(this.refs['qty' + item.PlaceMenuItem.id]);

        qtyLabel.innerHTML = Number(qtyLabel.innerHTML) + 1;
        qty.value = Number(qty.value) + 1;

        e.preventDefault();
    }

    // Handle when user clicks (-) quantity
    _handleQtyMinus(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleQtyMinus ---');
        }

        var {item} = this.state;

        var qtyLabel = ReactDOM.findDOMNode(this.refs['qtyLabel' + item.PlaceMenuItem.id]);
        var qty = ReactDOM.findDOMNode(this.refs['qty' + item.PlaceMenuItem.id]);

        if (Number(qtyLabel.innerHTML) > 1) {
            qtyLabel.innerHTML = Number(qtyLabel.innerHTML) - 1;
            qty.value = Number(qty.value) - 1;
        }

        e.preventDefault();
    }

    // Handle when user clicks cart update
    _handleUpdateCartClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleUpdateCartClick ---');
        }

        var {item, customer, suite} = this.state;

        var id = item.id;
        var qty = ReactDOM.findDOMNode(this.refs['qty' + item.PlaceMenuItem.id]);
        var notes = ReactDOM.findDOMNode(this.refs['notes' + item.PlaceMenuItem.id]);

        CartRequestActions.updateCartItemByCustomerId(customer.User.id, id, qty.value, notes.value, suite.KioskStation.id);

        $('#suiteCartEditPopupModal' + item.id).closeModal();

        e.preventDefault();
    }

    // Handle when user clicks delete cart item
    _handleDeleteItemCartClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleDeleteItemCartClick ---');
        }

        var {item, customer, suite} = this.state;
        var id = item.id;

        CartRequestActions.deleteCartItemByCustomerId(customer.User.id, id, suite.KioskStation.id);

        $('#suiteCartEditPopupModal' + item.id).closeModal();

        e.preventDefault();
    }

}

export default SuiteCartItemActionElement;
