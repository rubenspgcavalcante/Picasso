Picasso.load("error.InvalidParameters");

/**
 * Invalid parameters error
 * @param {string} funcName The name of the function that are throwing this error
 * @param {Object<string, String>} errorParameters A map of parameter/error message type
 * @param {Object} context The context that the error occurred
 * @extends {Error}
 * @constructor
 */
Picasso.error.InvalidParameters = function (funcName, errorParameters, context) {

    this.name = "InvalidParameters";

    this.message = "The function " + funcName + " has received invalid parameters\n";
    var template = "\tparameter %param%: %dependence%;\n";

    for(var i in errorParameters){
        if(errorParameters.hasOwnProperty(i)){
            this.message += template.replace("%param%", i).replace("%dependence%", errorParameters[i]);
        }
    }

    this.errorParameters = errorParameters || null;
    this.context = context || null;
};

Picasso.error.InvalidParameters.prototype = Error.prototype;
Picasso.error.InvalidParameters.constructor = Picasso.error.InvalidParameters;