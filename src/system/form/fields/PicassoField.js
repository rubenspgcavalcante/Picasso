Picasso.load("form.field.PicassoField");

/**
 * The default field implementation
 * @abstract
 * @constructor
 */
Picasso.form.field.PicassoField = function(){

    /**
     * The html of the field
     * @type {HTMLElement}
     * @protected
     */
    this._dom = null;

    /**
     * Returns or sets the value of a field
     * @param {*} val
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.value = function(val){
        throw new Picasso.error.NotImplementedError("PicassoField", "value");
    };

    /**
     * Resets the field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.reset = function(){
        throw new Picasso.error.NotImplementedError("PicassoField", "reset");
    };

};