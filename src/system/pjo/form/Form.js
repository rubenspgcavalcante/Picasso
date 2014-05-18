Picasso.load("pjo.Form");

/**
 * A form object representation
 * @constructor
 */
Picasso.pjo.Form = function(){
    this.id = null;
    this.attrs = {
        action: "",
        method: "",
        name: ""
    };

    /** @type {Object<String, Picasso.pjo.FieldSet>} */
    this.fieldSets = {};
};