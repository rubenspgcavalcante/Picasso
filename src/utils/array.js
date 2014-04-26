/**
 * A set of array utils
 * @module {utils}
 */

Picasso.module("Picasso.utils.array");
Picasso.utils.array = (function () {

    // Dependences
    var objUtil = Picasso.module("Picasso.utils.object");


    /**
     * Finds a element into the array
     * @param {Array} arr A array to search into
     * @param {*} element The element to find
     * @return {boolean}
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
     * Compares two arrays of objects based
     * on their objects equals methods
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Boolean}
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