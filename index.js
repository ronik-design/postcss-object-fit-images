"use strict";

const postcss = require("postcss");

const getValueForProperty = function (parent, name) {

    let retValue;

    parent.walkDecls(name, (decl) => {
        if (name === decl.prop){
            retValue = decl.value;
        }
    });

    return retValue;
};

module.exports = postcss.plugin("postcss-object-fit-images", (opts) => {

    opts = opts || {};

    return function (css) {

        css.walkDecls(/(^object-fit$)/, (decl) => {

            const objectFit = decl.value;

            const fontFamily = getValueForProperty(decl.parent, "font-family", false);
            const objectPosition = getValueForProperty(decl.parent, "object-position", false);

            if (!fontFamily && objectPosition) {
                decl.cloneAfter({
                    prop: "font-family",
                    value: `"object-fit: ${objectFit}; object-position: ${objectPosition}"`
                });
            } else if (!fontFamily) {
                decl.cloneAfter({
                    prop: "font-family",
                    value: `"object-fit: ${objectFit}"`
                });
            }
        });
    };
});
