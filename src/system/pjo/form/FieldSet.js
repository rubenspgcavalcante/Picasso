Picasso.load("pjo.FieldSet");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.FieldSet = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {number} */
    this.index = 0;

    /** @type {string} */
    this.legend = "";

    /** @type {Object} */
    this.attrs = {};

    /** @type {Picasso.pjo.Field[]} */
    this.fields = [];
};