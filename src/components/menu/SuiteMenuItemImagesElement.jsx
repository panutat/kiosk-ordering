'use strict';

var DEBUG = false;
var _name = 'SuiteMenuItemImagesElement.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

class SuiteMenuItemImagesElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
            imageDisplayURL: props.item.PlaceMenuTree.image
        };

        this._handleImageClick = this._handleImageClick.bind(this);
    }

    render() {
        if (DEBUG) {
            console.log('[*] ' + _name + ':render ---');
            console.log(this.props);
        }

        var imageStyle = {
            margin: '1px',
            maxHeight: '300px'
        }
        var hidden = {
            display: 'none'
        }

        var {item, imageDisplayURL} = this.state;

        return (
            <div>
                <img id="imageDisplay" className="responsive-img" src={imageDisplayURL} style={imageStyle}/>
                <div className="row">
                    {this.getFirstImage(item)}
                    {this.getImageThumbnails(item.PlaceMenuItem.Images)}
                </div>
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
            imageDisplayURL: nextProps.item.PlaceMenuTree.image
        });
    }

    // Build first thumbnail image
    getFirstImage(item) {
        var imageStyle = {
            margin: '1px',
            maxHeight: '300px'
        }
        var hidden = {
            display: 'none'
        }
        if (item.PlaceMenuItem.Images.length > 0) {
            return (
                <div key={0} className="col s3 center-align">
                    <img id={'thumbnail_' + 0} className="responsive-img" src={item.PlaceMenuTree.thumbnail} style={imageStyle} onClick={this._handleImageClick}/>
                    <img ref={'image_' + 0} src={item.PlaceMenuTree.image} style={hidden}/>
                </div>
            );
        }
    }

    // Build all other thumbnail images
    getImageThumbnails(images) {
        var imageStyle = {
            margin: '1px',
            maxHeight: '300px'
        }
        var hidden = {
            display: 'none'
        }

        return images.map((image, index) => {
            if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-images ---');
                console.log(image);
            }
            if (index > 2) {
                return;
            }
            return (
                <div key={image.id} className="col s3 center-align">
                    <img id={'thumbnail_' + image.id} className="responsive-img" src={image.thumbnail} style={imageStyle} onClick={this._handleImageClick}/>
                    <img ref={'image_' + image.id} src={image.image} style={hidden}/>
                </div>
            );
        }, this);
    }

    // Handle when user clicks thumbnails
    _handleImageClick(e) {
        if (DEBUG) {
            console.log('[*] ' + _name + ':_handleImageClick ---');
        }

        var image = ReactDOM.findDOMNode(this.refs['image_' + e.target.id.split('_')[1]]);
        this.setState({
            imageDisplayURL: image.src
        });
    }

}

export default SuiteMenuItemImagesElement;
