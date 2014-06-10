Picasso.load("utils.object");
Picasso.utils.object = (
/**
 * A set of object utils
 * @exports utils/object
 */
    function () {

        /**
         * Transforms a string delimited by "-"
         * to a camel case notation
         * @param {string} property
         * @returns {string}
         * @private
         */
        var _toCamelCase = function (property) {
            return property.toLowerCase().replace(/-(.)/g, function (match, g1) {
                return g1.toUpperCase();
            });
        };

        /**
         * Extends a constructor
         * @param {Function} Class The object constructor
         * @param {Function} Parent The parent object constructor
         * @returns {Function} The Class constructor
         */
        var extend = function (Class, Parent) {
            //Rent a prototype
            var Rented = new Function();
            Rented.prototype = Parent.prototype;
            Class.prototype = new Rented();
            Class._super = Parent.prototype;
            Class.prototype.constructor = Class;

            return Class;
        };


        /**
         * 'For each' callback
         * @callback utils/object.eachCallback
         * @param {*} value
         * @param {string} property
         */

        /**
         * Iterates over a object properties
         * @param {Object} obj
         * @param {module:utils/object.eachCallback} call
         */
        var each = function (obj, call) {
            if (obj instanceof Object) {
                var property;
                for (property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        call(obj[property], property);
                    }
                }
            }
        };

        /**
         * Compares two objects and
         * verify if they are equals
         * @param {Object} obj1
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

        /**
         * Converts the given object to the strict properties of
         * the plain object constructor
         * @param {Object} obj
         * @param {Object.constructor} plainObjectConstructor
         */
        var deserialize = function (obj, plainObjectConstructor) {
            var pjo = new plainObjectConstructor();
            var formattedObj = {};

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (i.indexOf("-") != -1) {
                        formattedObj[_toCamelCase(i)] = obj[i];
                    }
                    else {
                        formattedObj[i] = obj[i];
                    }
                }
            }

            for (var property in pjo) {
                if (pjo.hasOwnProperty(property) && formattedObj.hasOwnProperty(property)) {
                    pjo[property] = formattedObj[property];
                }
            }

            return pjo;
        };

        // Public API
        return {
            extend: extend,
            equals: equals,
            each: each,
            deserialize: deserialize
        }
    }()
    );