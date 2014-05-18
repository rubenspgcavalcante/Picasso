Picasso.load("pjo.Field");

/**
 * A form field
 * @constructor
 */
Picasso.pjo.Field = function(){
    /** @type {String|Number} */
    this.id = null;

    /** @type {Picasso.pjo.Field.type} */
    this.type = null;

    /**
     * The field attributes
     * @type {{name: string}}
     */
    this.attrs = {
        name: ""
    };
};

/**
 * Available default field types
 * @readonly
 * @enum {String}
 */
Picasso.pjo.Field.type = {
    TEXT: "text",
    NUMBER: "number",
    EMAIL: "email"
};