Picasso.load("pjo.Field");

/**
 * A form field
 * @constructor
 */
Picasso.pjo.Field = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {string} */
    this.label = "";

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
 * @enum {string}
 */
Picasso.pjo.Field.type = {
    TEXT: "text",
    TEXTAREA: "textarea",
    NUMBER: "number",
    EMAIL: "email",
    PASSWORD: "password",
    SUBMIT: "submit",
    CANCEL: "cancel"
};