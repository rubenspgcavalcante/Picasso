Picasso.load("pjo.Form");

/**
 * A form object representation
 * @constructor
 */
Picasso.pjo.Form = function(){
     /** @type {string|number} */
    this.id = null;

    /**
     * The form attributes
     * @type {{action: string, method: string, name: string}}
     */
    this.attrs = {
        action: "",
        method: "",
        name: ""
    };

    /** @type {Picasso.pjo.Grid} */
    this.grid = null;
};