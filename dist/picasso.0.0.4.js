/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

// -- Namespace virtual comments -- //

/**
 * Declares the plain javascript object constructors
 * @namespace {Object} Picasso.pjo
 */

/**
 * All the system core objects
 * @namespace {Object} Picasso.core
 */

/**
 * All the system errors objects
 * @namespace {Object} Picasso.error
 */

/**
 * All the utils modules
 * @namespace {Object} Picasso.utils
 */

// -- End of load virtual comments -- //

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "Rubens Pinheiro Gonçalves Cavalcante",
    version: "0.0.4",
    build: "2014-04-29",
    license: "GPLv3"
};
/**
 * Declares or loads already declared module/namespace
 * @example
 * // Declaring
 * Picasso.load("utils.array");
 * // Using
 * var arrayUtils = Picasso.load("utils.array");
 *
 * @param {String} namespace The module complete namespace
 * @return {Object} The loaded module
 */
Picasso.load = function (namespace) {
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
Picasso.load("pjo.Event");

/**
 * The default event object
 * @param {String} name
 * @param {*} data
 * @param {Object} target
 * @constructor
 */
Picasso.pjo.Event = function PicassoEvent(name, data, target) {
    /** @type String */
    this.name = name || "any";

    /** @type * */
    this.data = data || null;

    /** @type Object */
    this.target = target || null;
};
Picasso.load("pjo.EventHandler");

/**
 * Default event handler
 * @param {String} eventName
 * @param {Function} callback
 * @param {Object} context
 * @constructor
 */
Picasso.pjo.EventHandler = function (eventName, callback, context) {
    /** @type String */
    this.eventName = eventName || "";

    /** @type Function */
    this.callback = callback || new Function();

    /** @type Object */
    this.context = context || null;
};
Picasso.load("error.InvalidParameters");

/**
 * Invalid parameters error
 * @param {String} funcName The name of the function that are throwing this error
 * @param {Object<String, String>} errorParameters A map of parameter/error message type
 * @param {Object} context The context that the error occurred
 * @extends {Error}
 * @constructor
 */
Picasso.error.InvalidParameters = function (funcName, errorParameters, context) {
    this.msg = "The function %funcName% has received invalid parameters";
    this.errorParameters = errorParameters || null;
    this.context = context || null;
};

Picasso.error.InvalidParameters.prototype = new Error();
Picasso.load("Picasso.utils.array");
Picasso.utils.array = (

/**
 * A set of array utils
 * @exports utils/array
 */
    function () {

        // Depedences
        /**
         * Object utils
         * @type module:utils/object
         * @private
         */
        var objUtil = Picasso.load("Picasso.utils.object");


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

    }()
    );
Picasso.load("Picasso.utils.object");
Picasso.utils.object = (
/**
 * A set of object utils
 * @exports utils/object
 * @memberOf Picasso.utils
 */
    function () {

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

    }()
    );