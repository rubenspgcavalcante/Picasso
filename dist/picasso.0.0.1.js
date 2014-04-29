/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "Rubens Pinheiro Gonçalves Cavalcante",
    version: "0.0.1",
    build: "2014-04-29",
    license: "GPLv3"
};
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
/**
 * A set of array utils
 * @module utils/array
 */

Picasso.module("Picasso.utils.array");
Picasso.utils.array = (function () {

    // Depedences
    var objUtil = Picasso.module("Picasso.utils.object");


    /**
     * Finds a element into the array
     * @param {Array} arr A array to search into
     * @param {*} element The element to find
     * @return {boolean} If the element was found
     * @public
     */
    var find = function (arr, element) {
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] == 'object' && typeof element == 'object') {
                if (objUtil.equals(arr[i], element)) {
                    return true;
                }
            }
            else {
                if (arr[i] === element) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * Compares two arrays and verify if their are equals
     * @param {Array} arr1 First array
     * @param {Array} arr2 Second array
     * @return {boolean} If they are equals
     * @public
     */
    var equals = function (arr1, arr2) {
        if (arr1.length != arr2.length) return false;

        for (var i = 0; i < arr2.length; i++) {
            if (!find(arr1, arr2[i])) {
                return false;
            }
        }

        return true;
    };

    // Public API
    return {
        find: find,
        equals: equals
    }

}());
/**
 * A set of object utils
 * @module utils/object
 */

Picasso.module("Picasso.utils.object");
Picasso.utils.object = (function () {

    /**
     * Compares two objects and
     * verify if they are equals
     * @param {Object} obj2
     * @return {Boolean}
     * @public
     */
    var equals = function (obj1, obj2) {
        var path;
        for (path in obj1) {
            if (typeof(obj2[path]) == 'undefined') {
                return false;
            }
        }

        for (path in obj1) {
            if (obj1[path]) {
                switch (typeof(obj1[path])) {
                    case 'object':
                        if (!obj1[path].equals(obj2[path])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof(obj2[path]) == 'undefined' ||
                            (path != 'equals' && obj1[path].toString() != obj2[path].toString())
                            ) {
                            return false;
                        }
                        break;
                    default:
                        if (obj1[path] != obj2[path]) {
                            return false;
                        }
                }
            }
            else {
                if (obj2[path]) {
                    return false;
                }
            }
        }

        for (path in obj2) {
            if (typeof(obj1[path]) == 'undefined') {
                return false;
            }
        }

        return true;
    };

    // Public API
    return {
        equals: equals
    }

}());
