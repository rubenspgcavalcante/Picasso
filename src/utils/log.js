Picasso.load("utils.log");

Picasso.utils.log = (
    /**
     * Defines a set of functions to log messages
     * @exports utils/log
     */
    function () {
        /**
         * All the logging function utilities
         * @export utils/log
         */
        var warn = function (msg, context) {
            console.warn(msg, context);
        };

        return {
            warn: warn
        };
    }());