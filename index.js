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

    if (!fontFamily && objPosition) {
        decl.cloneBefore({
            prop: 'font-family',
            value: `"object-fit: ${objFit}; object-position: ${objPosition}"`
        });
    } else if (!fontFamily) {
        decl.cloneBefore({
            prop: 'font-family',
            value: `"object-fit: ${objFit}"`
        });
    }
};

module.exports = postcss.plugin('postcss-object-fit-images', (opts) => {

    opts = opts || {};

    return function (css) {
        css.walkDecls(/(^object-fit$)/, declWalker);
    };
});
