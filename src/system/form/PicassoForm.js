Picasso.load("form.PicassoForm");

/**
 * The Picasso representation of a form
 * @constructor
 */
Picasso.form.PicassoForm = function () {

    /**
     * The form fields
     * @type {Object<string, Picasso.form.field.PicassoField>}
     * @private
     */
    var fields = {};

    /**
     * The HTML representation of this object
     * @type {HTMLFormElement}
     * @private
     */
    var element = null;

    /**
     * Describes the valid state of the form
     * @type {boolean}
     */
    this.valid = false;

    /**
     * Adds a field to the form
     * @param {Picasso.form.field.PicassoField} pField
     */
    this.addField = function (pField) {
        fields[pField.getId()] = pField;
    };

    /**
     * Gets the form fields
     * @returns {Picasso.form.field.PicassoField[]}
     */
    this.getFields = function () {
        var res = [];
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                res.push(fields[i]);
            }
        }
        return res;
    };

    /**
     * Gets a field by the Id
     * @param {string} fieldId
     * @return {Picasso.form.field.PicassoField}
     */
    this.getField = function (fieldId) {
        if (fields.hasOwnProperty(fieldId)) {
            return fields[fieldId];
        }
        return null;
    };

    /**
     * Sets the html element
     * @param {HTMLFormElement} htmlForm
     */
    this.setHTMLElement = function (htmlForm) {
        element = htmlForm;
    };

    /**
     * Gets the html element
     * @returns {HTMLFormElement}
     */
    this.getHTMLElement = function () {
        return element;
    };

    /**
     * Gets/Sets the form value
     * @param {Object<string, *>} data
     * returns {Object}
     */
    this.value = function (data) {
        var fields = this.getFields();
        if (typeof data == "undefined") {
            var val = {};

            for (var i = 0; i < fields.length; i++) {
                var id = fields[i].getId();
                if (typeof id != "undefined" && !fields[i].formIgnore) {
                    val[id] = fields[i].value();
                }
            }

            return val;
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this.getField(key).value(data[key]);
                }
            }
        }
    };
};

/**
 * A alias to the Picasso Form object constructor
 * @alias {Picasso.form.PicassoForm}
 */
Picasso.Form = Picasso.form.PicassoForm;
