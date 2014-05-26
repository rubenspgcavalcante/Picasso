Picasso.load("form.field.PicassoField");

/**
 * The default field implementation
 * @constructor
 */
Picasso.form.field.PicassoField = function(){

    /**
     * The html of the field
     * @type {HTMLElement}
     * @protected
     */
    this._element = null;

    /**
     * Builds the field
     * @param {Picasso.pjo.Field} field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.build = function(field){
        throw new Picasso.error.NotImplementedError("PicassoField", "build");
    };

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

    /**
     * Get the HTMLElement of this field
     * @return {HTMLElement}
     */
    this.getHTMLElement = function(){
        return this._element;
    };

    /**
     * Sets the HTMLElement of this field
     * @param {HTMLElement} element
     */
    this.setHTMLElement = function(element){
        if(element instanceof HTMLElement){
            this._element = element;
        }
    };

};