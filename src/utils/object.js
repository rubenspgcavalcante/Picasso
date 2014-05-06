Picasso.load("Picasso.utils.object");
Picasso.utils.object = (
/**
 * A set of object utils
 * @exports utils/object
 */
    function () {

        /**
         * Extends a constructor
         * @param {Function} Class The object constructor
         * @param {Function} Parent The parent object constructor
         * @returns {Function} The Class constructor
         */
        var extend = function(Class, Parent){
            //Rent a prototype
            var Rented = new Function();
            Rented.prototype = Parent.prototype;
            Class.prototype = new Rented();
            Class._super = Parent.prototype;
            Class.prototype.constructor = Class;

            return Class;
        };

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
            extend: extend,
            equals: equals
        }

    }()
    );