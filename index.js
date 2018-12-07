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
    var scrollBehavior = decl.value;

    var existingFont = getLastPropertyDecl(parent, /^font(-family)?$/);

    var value = 'scroll-behavior:' + scrollBehavior;

    var props = {
        prop: 'font-family',
        value: quote(value)
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

module.exports = postcss.plugin(
    'postcss-smoothscroll-anchor-polyfill',
    function (opts) {
        opts = opts || {};

        return function (css) {
            css.walkDecls('scroll-behavior', declWalker);
        };
    }
);
