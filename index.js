'use strict';

const postcss = require('postcss');

const getValueForProperty = function (parent, name) {

    let retValue;

    parent.walkDecls(name, (decl) => {
        if (name === decl.prop) {
            retValue = decl.value;
        }
    });

    return retValue;
};

const declWalker = function (decl) {

    const parent = decl.parent;

    const objFit = decl.value;

    const fontFamily = getValueForProperty(parent, 'font-family', false);
    const objPosition = getValueForProperty(parent, 'object-position', false);

    const value = [
        'object-fit:' + objFit
    ];
    if (objPosition) {
        value.push('object-position:' + objPosition);
    }

    const props = {
        prop: 'font-family',
        value: '"' + value.join(';') + '"'
    };

    // keep existing font-family
    if (fontFamily) {
        props.value += ', ' + fontFamily;
    }

    decl.cloneBefore(props);
};

module.exports = postcss.plugin('postcss-object-fit-images', (opts) => {

    opts = opts || {};

    return function (css) {
        css.walkDecls(/(^object-fit$)/, declWalker);
    };
});
