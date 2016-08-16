'use strict';

var DEBUG = false;
var _name = 'Default.jsx';

import React from 'react';
import {Component} from 'react';

class DefaultLayout extends Component {

    render() {
        return (
            <div className="outer">
                <div className="inner z-depth-1">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

DefaultLayout.defaultProps = {};

export default DefaultLayout;
