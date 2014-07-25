Picasso.load("form.field.PicassoField");

/**
 * The default field implementation
 * @constructor
 */
Picasso.form.field.PicassoField = function (label, type, required, formIgnore) {
    /**
     * Sequence manager
     * @type {Picasso.core.Sequence}
     */
    var Sequence = Picasso.load("core.Sequence");

    /**
     * The html utils
     * @type {utils/html}
     */
    var htmlUtils = Picasso.load("utils.html");

    /**
     * The id of the field
     * @type {string|number}
     * @protected
     */
    this._id = null;

    /**
     * The html of the field
     * @type {HTMLElement}
     * @protected
     */
    this._element = null;

    /**
     * The field label
     * @type {string}
     * @protected
     */
    this._label = "";

    /**
     * If this field is ignored in
     * a form final value
     * @type {boolean}
     * @protected
     */
    this._formIgnore = false;

    /**
     * The flag to mark this field as required
     * @type {boolean}
     * @protected
     */
    this._required = false;

    /**
     * The type of this field
     * @type {string}
     * @protected
     */
    this._type = "";

    /**
     * Calls a 'post constructor' to this object
     * @param {string} label
     * @param {string} type
     * @param {boolean} required
     * @param {boolean} formIgnore
     * @private
     */
    this.__postConstructor__ = function(label, type, required, formIgnore){
        this._label = label;
        this._type = type;
        this._required = required;
        this._formIgnore = formIgnore;
    };

    /**
     * Builds the field
     * @param {Picasso.pjo.Field} field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.build = function (field) {
        throw new Picasso.error.NotImplementedError("PicassoField", "build");
    };

    /**
     * Verifies if the field is empty or not
     * @returns {boolean}
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.isEmpty = function () {
        throw new Picasso.error.NotImplementedError("PicassoField", "isEmpty");
    };

    /**
     * Returns or sets the value of a field
     * @param {*} val
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.value = function (val) {
        throw new Picasso.error.NotImplementedError("PicassoField", "value");
    };

    /**
     * Resets the field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.reset = function () {
        throw new Picasso.error.NotImplementedError("PicassoField", "reset");
    };

    /**
     * Get this field id
     * @returns {string|number}
     */
    this.getId = function () {
        return this._id;
    };

    /**
     * Get the field label
     * @return {string}
     */
    this.getLabel = function(){
        return this._label;
    };

    /**
     * Verify if the field is required
     * @return {boolean}
     */
    this.isRequired = function(){
        return this._required;
    };

    /**
     * Verify if the field is ignored in the form
     * @return {boolean}
     */
    this.isFormIgnored = function(){
        return this._formIgnore;
    };

    /**
     * Get the field type
     * @return {string}
     */
    this.getType = function(){
        return this._type;
    };

    /**
     * Sets this field id, if not is given
     * generates the id based on a sequence
     * @param {string|number} id
     */
    this.setId = function (id) {
        if (id == null || id == "") {
            var entity = this.type || "PicassoField";
            this._id = new Sequence(entity).nextVal();
        }
        else {
            if (this._element != null) {
                this._element.setAttribute("id", String(id));
            }

            this._id = id;
        }
    };

    /**
     * Add one or more classes (separated by space) to the field
     * @param {string} classes
     */
    this.addClass = function (classes) {
        htmlUtils.addClass(this._element, classes);
    };

    /**
     * Removes one or more classes (separated by space) to the field
     * @param {string} classes
     */
    this.removeClass = function (classes) {
        htmlUtils.removeClass(this._element, classes);
    };

    /**
     * Get the HTMLElement of this field
     * @return {HTMLElement}
     */
    this.getHTMLElement = function () {
        return this._element;
    };

    /**
     * Sets the HTMLElement of this field
     * @param {HTMLElement} element
     */
    this.setHTMLElement = function (element) {
        if (element instanceof HTMLElement) {
            this._element = element;
        }
    };

};