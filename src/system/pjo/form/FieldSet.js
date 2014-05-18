Picasso.load("pjo.FieldSet");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.FieldSet = function(){
    /** @type {String|Number} */
    this.id = null;

    /** @type {String} */
    this.legend = "";

    /** @type {Object<String, Picasso.pjo.Field>} */
    this.fields = {};
};