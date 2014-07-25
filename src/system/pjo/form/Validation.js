Picasso.load("pjo.Validation");

/**
 * A validation object
 * @constructor
 */
Picasso.pjo.Validation = function () {

    /** @type {Picasso.form.field.PicassoField} */
    this.field = null;

    /** @type {string[]} */
    this.errorMessages = [];

    /**0@type {boolean} */
    this.valid = false;

};