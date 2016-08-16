/**
 * Math API
 */
'use strict';

module.exports = {
    // Format currency values
    formatMoney(value, _c, _d, _t) {
        var n = value,
            c = isNaN(c = Math.abs(_c)) ? 2 : _c,
            d = d === undefined ? '.' : _d,
            t = t === undefined ? ',' : _t,
            s = n < 0 ? '-' : '',
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
    }

};
