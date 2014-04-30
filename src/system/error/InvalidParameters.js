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