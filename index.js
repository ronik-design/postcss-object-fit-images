'use strict';

var postcss = require('postcss');
var caniuseAPI = require('caniuse-api');
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

var runTransform = function (css, opts) {
    // If no browsers (undefined) are passed,
    // caniuse-api runs browserslist() automatically
    var browsers = opts.browsers || undefined;
    var supportsCSSVars = caniuseAPI.isSupported('css-variables', browsers);

    css.walkDecls('scroll-behavior', function (decl) {
        var parent = decl.parent;
        var scrollBehavior = decl.value;

        if (supportsCSSVars) {
            var existingVar = getLastPropertyDecl(parent, '--scroll-behavior');
            if (existingVar) return;

            var varProps = { prop: '--scroll-behavior', value: scrollBehavior };
            decl.cloneBefore(varProps);

            return;
        }

        var existingFont = getLastPropertyDecl(parent, /^font(-family)?$/);

        var value = 'scroll-behavior:' + scrollBehavior;
        var fontProps = { prop: 'font-family', value: quote(value) };

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
            fontProps.value += ', ' + fontFamily;

            if (existingFont.prop === 'font') {
                existingFont.cloneAfter(fontProps);
            } else {
                existingFont.replaceWith(fontProps);
            }
        } else {
            decl.cloneBefore(fontProps);
        }
    });
};

module.exports = postcss.plugin(
    'postcss-smoothscroll-anchor-polyfill',
    function (opts) {
        opts = opts || {};

        return function (css) {
            runTransform(css, opts);
        };
    }
);
