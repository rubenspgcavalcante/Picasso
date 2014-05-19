Picasso.load("error.InvalidFieldType");

/**
 * Invalid field type used
 * @param {string} fieldType
 * @constructor
 * @extends Error
 */
Picasso.error.InvalidFieldType = function(fieldType){
    this.name = "InvalidFieldType";
    this.message = "Can't find a constructor. Invalid field type " + String(fieldType);
};

Picasso.error.InvalidFieldType.prototype = Error.prototype;
Picasso.error.InvalidFieldType.constructor = Picasso.error.InvalidFieldType;