'use strict';

var DEBUG = false;
var _name = 'Place.jsx';

import React from 'react';
import {Component} from 'react';

import PlaceStore from '../stores/PlaceStore';
import PlaceRequestActions from '../actions/PlaceRequestActions';
import SuiteStore from '../stores/SuiteStore';
import SuiteRequestActions from '../actions/SuiteRequestActions';

import LocalStoreApi from '../utilities/LocalStoreApi';

var DefaultLayout = React.createFactory(require('../layouts/Default'));
var SuiteElement = React.createFactory(require('../components/SuiteElement'));

function getPlaceState() {
    return PlaceStore.getPlace();
}

function getSuitesState() {
    return SuiteStore.getSuites();
}

class Place extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeId: placeId,
            place: getPlaceState(),
            suites: getSuitesState()
        };

        this._placeChange = this._placeChange.bind(this);
        this._suiteChange = this._suiteChange.bind(this);

        PlaceStore.addChangeListener(this._placeChange);
        SuiteStore.addChangeListener(this._suiteChange);

        // Clean up suite in LocalStoreApi
        LocalStoreApi.removeItem('suite');
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var container = {
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden'
        }
        var suiteTiles = {
            marginTop: '0px',
            marginLeft: '0px',
            marginRight: '0px'
        }

        var {suites, place} = this.state;
        var name = place
            ? place.Place.name
            : '';
        var thumbnail = place
            ? place.Place.thumbnail
            : '';
        var placeId = place
            ? place.Place.id
            : 0;

        return (
            <div style={container}>
                <div className="row">
                    <div className="col m2 l1">
                        <a href={'/kiosk/app/' + placeId}>
                            <img className="responsive-img" src={thumbnail}/>
                        </a>
                    </div>
                    <div className="col m10 l11">
                        <h3 className="red-text text-darken-4">{name}</h3>
                    </div>
                </div>
                <div className="row" style={suiteTiles}>
                    {this._generateSuiteElements(suites)}
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

        var suites = getSuitesState();
        if (suites.length > 0) {
            this.setState({
                suites: suites
            });
        } else {
            SuiteRequestActions.fetchSuites(this.state.placeId);
        }

        var place = getPlaceState();
        if (place) {
            this.setState({
                place: place
            });
        } else {
            PlaceRequestActions.fetchPlace(this.state.placeId);
        }
    }

    componentWillUnmount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillUnmount ---');
        }

        PlaceStore.removeChangeListener(this._placeChange);
        SuiteStore.removeChangeListener(this._suiteChange);
    }

    // Update component state when place changes
    _placeChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_placeChange ---');
        }

        // Store place in LocalStoreApi
        LocalStoreApi.setItem('place', getPlaceState());

        this.setState({
            place: getPlaceState()
        });
    }

    // Update component state when suite changes
    _suiteChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_suiteChange ---');
        }

        this.setState({
            suites: getSuitesState()
        });
    }

    // Build new array of suite elements
    _generateSuiteElements(suites) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':generateSuiteElements ---');
        }

        return suites.map((suite, index) => {
            return (
                <SuiteElement key={suite.KioskStation.id} suite={suite}/>
            );
        }, this);
    }
}

Place.defaultProps = {
    layout: DefaultLayout
};

export default Place;
