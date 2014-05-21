Picasso.load("pjo.FieldGrid");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.FieldGrid = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {number} */
    this.index = 0;

    /** @type {Picasso.pjo.FieldGrid.colSize} */
    this.colXSize = 3;

    /** @type {string} */
    this.legend = "";

    /** @type {Picasso.pjo.Field[]} */
    this.fields = [];
};

/**
 * The size of the grid columns
 * @enum {string}
 * @readonly
 */
Picasso.pjo.FieldGrid.colSize = {
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4
};