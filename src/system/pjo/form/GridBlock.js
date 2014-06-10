Picasso.load("pjo.GridBlock");

Picasso.pjo.GridBlock = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {string} */
    this.legend = null;

    /**
     * The element attributes
     * @type {{name: string}}
     */
    this.attrs = {};

    /** @type {Picasso.pjo.FieldGrid[]} */
    this.fieldGrid = [];
};