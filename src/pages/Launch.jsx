'use strict';

var DEBUG = false;
var _name = 'Launch.jsx';

import React from 'react';
import {Component} from 'react';
import AppConfig from '../config.js';

import RouteActions from '../actions/RouteActions';
import SessionStore from '../stores/SessionStore';
import SessionRequestActions from '../actions/SessionRequestActions';
import PlaceStore from '../stores/PlaceStore';
import PlaceRequestActions from '../actions/PlaceRequestActions';

import LocalStoreApi from '../utilities/LocalStoreApi';

var DefaultLayout = React.createFactory(require('../layouts/Default'));
var Loader = React.createFactory(require('../components/Loader'));
var LaunchLoginPopupElement = React.createFactory(require('../components/LaunchLoginPopupElement'));

function getSessionState() {
    return SessionStore.getSession();
}
function getPlaceState() {
    return PlaceStore.getPlace();
}

class Launch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeId: placeId,
            place: null,
            session: null,
            loading: false
        };

        this._sessionChange = this._sessionChange.bind(this);
        this._placeChange = this._placeChange.bind(this);

        SessionStore.addChangeListener(this._sessionChange);
        PlaceStore.addChangeListener(this._placeChange);
    }

    render() {
        if (this.state.session && this.state.session.valid) {
            $('#modal').closeModal();
            setTimeout(() => {
                RouteActions.setRoute('/place');
            }, AppConfig.loadingDelay);
        }

        var wrapper = {
            height: '100%'
        }
        var align = {
            margin: 'auto'
        }
        var placeImage = {
            height: '250px'
        }

        var {place, loading} = this.state;
        var name = place
            ? place.Place.name
            : '';
        var image = place
            ? place.Place.image
            : '';

        return (
            <div className="valign-wrapper" style={wrapper}>
                <div className="valign center-align" style={align}>
                    <a className="waves-effect waves-light modal-trigger" href="#launchLoginPopupModal" id="trigger-modal">
                        <img className="responsive-img" src={image} style={placeImage}/>
                    </a>
                    <h3>{name}</h3>
                    {this.displayLoading(loading)}
                </div>
                <LaunchLoginPopupElement place={this.state.place}/>
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

        PlaceRequestActions.fetchPlace(this.state.placeId);
        SessionRequestActions.fetchSession('', '');
    }

    componentWillUnmount() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':componentWillUnmount ---');
        }

        SessionStore.removeChangeListener(this._sessionChange);
        PlaceStore.removeChangeListener(this._placeChange);
    }

    // Display loading animation
    displayLoading(loading) {
        if (loading) {
            return (
                <div>
                    <h5>Loading</h5>
                    <Loader/>
                </div>
            )
        }
    }

    // Handle user session change
    _sessionChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_sessionChange ---');
        }

        var session = getSessionState();
        if (session) {
            if (session.valid === 1) {
                LocalStoreApi.setItem('session', session);
                this.setState({
                    session: session,
                    loading: true
                });
            } else {
                $('#trigger-modal').click();
                SessionStore.resetSession();
                LocalStoreApi.removeItem('session');
                if (session.message !== "") {
                    Materialize.toast(session.message, AppConfig.messageDelay);
                }
            }
        }
    }

    // Update component state when place changes
    _placeChange() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_placeChange ---');
        }

        this.setState({
            place: getPlaceState()
        });
    }

}

Launch.defaultProps = {
    layout: DefaultLayout
};

export default Launch;
