Picasso.load("pjo.FieldSet");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.FieldSet = function(){
    this.id = null;
    this.legend = "";

    /** @type {Object<String, Picasso.pjo.Field>} */
    this.fields = {};
};