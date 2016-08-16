'use strict';

var DEBUG = false;
var _name = 'SuiteElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuitePinPopupElement from '../components/SuitePinPopupElement';

class SuiteElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite
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
            width: '100%',
            marginBottom: '10px',
            height: '70px',
            lineHeight: '20px',
            paddingTop: '14px'
        }
        var icon = {
            fontSize: '25px'
        }

        var {suite} = this.state;

        if (suite.KioskStation.enabled === '1') {
            return (
                <div className="col m3 l2" style={container}>
                    <a className="waves-effect waves-light btn z-depth-1 red darken-4 modal-trigger" href={'#suitePinPopupModal' + suite.KioskStation.id} id={'trigger-modal' + suite.KioskStation.id} style={button}>
                        <i className="large material-icons" style={icon}>airplay</i><br/>
                        {suite.KioskStation.name}
                    </a>
                    <SuitePinPopupElement suite={suite} destination={'/suite'} title="Login"/>
                </div>
            );
        } else {
            return (
                <div className="col m3 l2" style={container}>
                    <a className="waves-effect waves-light btn z-depth-1 grey" style={button}>
                        <i className="large material-icons" style={icon}>airplay</i><br/>
                        {suite.KioskStation.name}
                    </a>
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
            suite: nextProps.suite
        });
    }

}

export default SuiteElement;
