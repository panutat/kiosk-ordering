'use strict';

var DEBUG = false;
var _name = 'SuiteDisabledElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuitePinPopupElement from '../components/SuitePinPopupElement';

class SuiteDisabledElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: props.place,
            suite: props.suite
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var kioskDisabled = {
            textAlign: 'center',
            padding: '70px 0px',
            backgroundColor: '#ffffff',
            height: '100%'
        }
        var suiteNameStyle = {
            margin: '0px'
        }
        var logoStyle = {
            height: '250px'
        }
        var poweredByStyle = {
            color: '#999999',
            fontSize: '13px'
        }

        var {place, suite} = this.state;

        var placeName = place
            ? place.Place.name
            : '';
        var url = place
            ? place.Place.dasdak_url
            : '';
        var suiteName = suite
            ? suite.KioskStation.name
            : placeName;
        var image = place
            ? place.Place.image
            : '';

        return (
            <div style={kioskDisabled}>
                <h2 className="red-text text-darken-4" style={suiteNameStyle}>{suiteName}</h2>
                <div style={poweredByStyle}>Powered by Dasdak.com</div>
                <h5>Kiosk Disabled</h5>
                <div id="push_status"><label id="status_label">******</label></div>
                <a href={'#suitePinPopupModal' + suite.KioskStation.id} id={'trigger-modal' + suite.KioskStation.id}>
                    <img className="responsive-img" src={image} style={logoStyle}/>
                </a>
                <SuitePinPopupElement suite={suite} destination={'/place'} title="Logout"/>
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
            place: nextProps.place
        });
    }

}

export default SuiteDisabledElement;
