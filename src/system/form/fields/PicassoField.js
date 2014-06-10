Picasso.load("form.field.PicassoField");

/**
 * The default field implementation
 * @constructor
 */
Picasso.form.field.PicassoField = function () {
    var Sequence = Picasso.load("core.Sequence");

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
     * The type of this field
     * @type {string}
     * @public
     */
    this.type = "";


    /**
     * If this field is ignored in
     * a form final value
     * @type {boolean}
     */
    this.formIgnore = false;

    /**
     * The flag to mark this field as required
     * @type {boolean}
     * @public
     */
    this.required = false;

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