Picasso.load("error.NotImplementedError");

/**
 * Invalid field type used
 * @param {string} constructor
 * @param {string} method
 * @constructor
 * @extends Error
 */
Picasso.error.NotImplementedError = function(constructor, method){
    this.name = "NotImplementedError";
    this.message = constructor + " object child must implement the " +  method + " method";
};

Picasso.error.NotImplementedError.prototype = Error.prototype;
Picasso.error.NotImplementedError.constructor = Picasso.error.NotImplementedError;
