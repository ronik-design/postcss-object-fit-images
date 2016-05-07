'use strict';

var postcss = require('postcss');
var parseCssFont = require('parse-css-font');
var quote = require('quote');

var quoteIfNecessary = function (family) {
    if (/[^^]\s[^$]/.test(family)) {
        return quote(family);
    }
    return family;
};

var getLastPropertyDecl = function (parent, name) {

    var decl;

    parent.walkDecls(name, function (currentDecl) {
        decl = currentDecl;
    });

    return decl;
};

var declWalker = function (decl) {

    var parent = decl.parent;

    var objFit = decl.value;

    var existingFont = getLastPropertyDecl(parent, /font|font-family/);
    var objPosition = getLastPropertyDecl(parent, 'object-position');

    var value = [
        'object-fit:' + objFit
    ];
    if (objPosition) {
        value.push('object-position:' + objPosition.value);
    }

    var props = {
        prop: 'font-family',
        value: quote(value.join(';'))
    };

    // keep existing font-family
    var fontFamily;
    if (existingFont) {
        if (existingFont.prop === 'font') {
            fontFamily = parseCssFont(existingFont.value).family;
            fontFamily = fontFamily.map(quoteIfNecessary).join(', ');
        } else {
            fontFamily = existingFont.value;
        }
    }
    if (fontFamily) {
        props.value += ', ' + fontFamily;

        if (existingFont.prop === 'font') {
            existingFont.cloneAfter(props);
        } else {
            existingFont.replaceWith(props);
        }
    } else {
        decl.cloneBefore(props);
    }

};

module.exports = postcss.plugin('postcss-object-fit-images', function (opts) {

    opts = opts || {};

    return function (css) {
        css.walkDecls('object-fit', declWalker);
    };
});
