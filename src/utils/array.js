Picasso.load("utils.array");
Picasso.utils.array = (

    /**
     * A set of array utils
     * @exports utils/array
     */
    function () {
        /**
         * Finds a element into the array
         * @param {Array} arr A array to search into
         * @param {*} element The element to find
         * @return {boolean} If the element was found
         * @public
         */
        var find = function (arr, element) {
            /**
             * Object utils
             * @type module:utils/object
             * @private
             */
            var objUtil = Picasso.load("Picasso.utils.object");

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

        /**
         * 'For each' callback
         * @callback module:utils/array.eachCallback
         * @param {*} element Current element of the iteration
         * @param {number} index The current index
         */

        /**
         * Iterates over a array, executing a callback
         * to each element
         * @param {Array} arr
         * @param {module:utils/array.eachCallback} call
         * @public
         */
        var each = function (arr, call) {
            if(typeof arr === "undefined"){
                return;
            }

            var i, l;

            l = arr.length;
            for (i = 0; i < l; i++) {
                call(arr[i], i);
            }
        };

        // Public API
        return {
            find: find,
            equals: equals,
            each: each
        }

    }()
);