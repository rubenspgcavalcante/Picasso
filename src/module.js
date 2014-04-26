/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

/**
 * Declares or loads already declared module
 * @example
 * // Declaring
 * Picasso.module("Picasso.Utils.Array");
 * // Using
 * var arrayUtils = Picasso.module("Picasso.Utils.Array");
 *
 * @param {String} namespace The module complete namespace
 * @return {Object} The loaded module
 */
Picasso.module = function (namespace) {
    var parts = namespace.split('.');
    var currentObj = Picasso;

    // strip redundant leading global
    if (parts[0] === "Picasso") {
        parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
        if (typeof currentObj[parts[i]] === "undefined") {
            currentObj[parts[i]] = {};
        }
        currentObj = currentObj[parts[i]];

    }
    return currentObj;
};