'use strict';

var DEBUG = false;
var _name = 'SuiteOrderItemElement.jsx';

import React from 'react';
import {Component} from 'react';

class SuiteOrderItemElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            item: props.item,
            customer: props.customer
        };
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
        var quantity = {
            position: 'absolute',
            margin: '5px',
            border: '1px solid #cccccc',
            backgroundColor: '#ffffff',
            width: '40px',
            height: '30px',
            borderRadius: '4px',
            textAlign: 'center',
            lineHeight: '28px'
        }

        var {item, suite, customer} = this.state;

        return (
            <div className="col m4 l2" style={container}>
                <a className="waves-effect waves-light z-depth-1" style={button}>
                    <div style={quantity}>{item.quantity}</div>
                    <img className="responsive-img" src={item.thumbnail} style={image}/>
                    <p style={title}>{item.title}</p>
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
            suite: nextProps.suite,
            item: nextProps.item,
            customer: nextProps.customer
        });
    }
}

export default SuiteOrderItemElement;
