Picasso.load("pjo.Grid");

Picasso.pjo.Grid = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {string} */
    this.legend = null;

    /**
     * The element attributes
     * @type {{name: string}}
     */
    this.attrs = {};

    /** @type {Picasso.pjo.Column[]} */
    this.columns = [];
};