'use strict';

var DEBUG = false;
var _name = 'SuiteCartHeaderElement.jsx';

import React from 'react';
import {Component} from 'react';

import SuitePinPopupElement from '../../components/SuitePinPopupElement';

class SuiteCartHeaderElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            place: props.place
        };
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
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
            : '';
        var thumbnail = place
            ? place.Place.thumbnail
            : '';

        var row = {
            marginBottom: '0px'
        }
        var logoStyle = {
            height: '70px'
        }
        var suiteNameStyle = {
            margin: '0px'
        }
        var mobileAccessStyle = {
            margin: '5px 0 0 0',
            lineHeight: '16px',
            color: '#999999'
        }
        var poweredByStyle = {
            color: '#999999',
            fontSize: '13px'
        }
        var hidden = {
            display: 'none'
        }

        if (place.KioskSetting.display_mobile_url === '0') {
            mobileAccessStyle = {
                display: 'none'
            }
        }

        return (
            <div className="row" style={row}>
                <div className="col s12">
                    <a className="right" href={'#suitePinPopupModal' + suite.KioskStation.id} id={'trigger-modal' + suite.KioskStation.id}>
                        <img className="responsive-img" src={thumbnail} style={logoStyle}/>
                    </a>
                    <div>
                        <h5 className="red-text text-darken-4" style={suiteNameStyle}>{suiteName}</h5>
                        <div style={poweredByStyle}>Powered by Dasdak.com</div>
                        <p style={mobileAccessStyle}>
                            Mobile Access URL:<br />
                            <label className="red-text text-darken-4">dasdak.com/{url}</label>
                        </p>
                    </div>
                </div>
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

export default SuiteCartHeaderElement;
