Picasso.load("pjo.Column");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.Column = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {number} */
    this.index = 0;

    /** @type {Picasso.pjo.Column.colSize} */
    this.colXSize = 3;

    /** @type {Picasso.pjo.Field[]} */
    this.fields = [];
};

/**
 * The size of the grid columns
 * @enum {string}
 * @readonly
 */
Picasso.pjo.Column.colSize = {
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4
};