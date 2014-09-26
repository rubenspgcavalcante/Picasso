Picasso.load("utils.log");

Picasso.utils.log = (
/**
 * Defines a set of functions to log messages
 * @exports utils/log
 */
    function () {
        /**
         * The log levels
         * @enum {string}
         */
        var lvs = {
            ERROR: "error",
            WARN: "warn",
            INFO: "info",
            DISABLED: "disabled"
        };

        var currentLevel = lvs.DISABLED;

        /**
         * Shows info in the console
         * @param {string} msg
         * @param {object} context
         */
        var info = function (msg, context) {
            if (currentLevel == lvs.INFO) {
                context = context || "(no context informed)";
                console.info(msg, context);
            }
        };

        /**
         * Warning in the console
         * @param {string} msg
         * @param {object} context
         */
        var warn = function (msg, context) {
            if (currentLevel == lvs.INFO || currentLevel == lvs.WARN) {
                context = context || "(no context informed)";
                console.warn(msg, context);
            }
        };

        /**
         * Error in the console
         * @param {string} msg
         * @param {object} context
         */
        var error = function (msg, context) {
            if (currentLevel == lvs.INFO || currentLevel == lvs.WARN || currentLevel == lvs.ERROR) {
                context = context || "(no context informed)";
                console.error(msg, context);
            }
        };

        /**
         * Sets the level of the logger
         * @param {lvs} level
         */
        var setLogLevel = function(level){
            currentLevel = level;
        };

        /**
         * Get the log level
         * @return {lvs}
         */
        var getLogLevel = function(){
            return currentLevel;
        };

        return {
            lvs: lvs,
            info: info,
            warn: warn,
            error: error,
            setLogLevel: setLogLevel,
            getLogLevel: getLogLevel
        };
    }());
