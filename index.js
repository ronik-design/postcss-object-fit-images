'use strict';

var postcss = require('postcss');

var getValueForProperty = function (parent, name) {

    var retValue;

    parent.walkDecls(name, function (decl) {
        if (name === decl.prop) {
            retValue = decl.value;
        }
    });

    return retValue;
};

var declWalker = function (decl) {

    var parent = decl.parent;

    var objFit = decl.value;

    var fontFamily = getValueForProperty(parent, 'font-family', false);
    var objPosition = getValueForProperty(parent, 'object-position', false);

    var value = [
        'object-fit:' + objFit
    ];
    if (objPosition) {
        value.push('object-position:' + objPosition);
    }

    var props = {
        prop: 'font-family',
        value: '"' + value.join(';') + '"'
    };

    // keep existing font-family
    if (fontFamily) {
        props.value += ', ' + fontFamily;
    }

    decl.cloneBefore(props);
};

module.exports = postcss.plugin('postcss-object-fit-images', function (opts) {

    opts = opts || {};

    return function (css) {
        css.walkDecls('object-fit', declWalker);
    };
});
