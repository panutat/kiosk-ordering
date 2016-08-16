'use strict';

var DEBUG = false;
var _name = 'SuiteCartItemElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuiteCartEditPopupElement from '../../components/cart/SuiteCartEditPopupElement';

class SuiteCartItemElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            customer: props.customer,
            suite: props.suite
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var square = {
            borderRadius: '5px'
        }
        var title = {
            fontSize: '13px'
        }
        var note = {
            fontSize: '12px'
        }

        var {item, customer, suite} = this.state;

        return (
            <tr>
                <td className="center-align">{item.quantity}</td>
                <td style={title}>
                    {item.title}<br/>
                    <i style={note}>{item.note}</i>
                </td>
                <td className="center-align">${item.price}</td>
                <td>
                    <a className="btn-floating btn waves-effect waves-light z-depth-1 blue" href={'#suiteCartEditPopupModal' + item.id} id={'trigger-modal' + item.id} style={square}>
                        <i className="material-icons">edit</i>
                    </a>
                    <SuiteCartEditPopupElement customer={customer} item={item} suite={suite}/>
                </td>
            </tr>
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

}

export default SuiteCartItemElement;
