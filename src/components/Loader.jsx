'use strict';

var DEBUG = false;
var _name = 'Loader.jsx';

var Loader = () => {
    if (DEBUG) {
        console.log('[*] ' + _name + ':render ---');
        console.log(this.props);
    }

    return (
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="gap-patch">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )

}

export default Loader;
