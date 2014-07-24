Picasso.load("form.field.HiddenField");

/**
 * The default hidden input builder
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.HiddenField = function () {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");


    /**
     * Verify if the input is empty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return this.value() == "";
    };

    /**
     * Gets/Sets the value of t he input
     * @param {*} val
     * @returns {*}
     */
    this.value = function (val) {
        var el = this._element;
        if (typeof val != "undefined") {
            el.value = val;
        }
        else {
            var res = el.value;
            return res == ""? null : res;
        }
    };

    /**
     * The HTMLElement builder
     * @param {Picasso.pjo.Field} field
     * @return {HTMLElement}
     */
    this.build = function (field) {

        var fieldElement = document.createElement("input");
        htmlUtils.setAttributes(fieldElement, {
            name: field.id || "",
            type: "hidden"
        });

        htmlUtils.setAttributes(fieldElement, field.attrs);
        this.setHTMLElement(fieldElement);
    };
};

Picasso.form.field.HiddenField.prototype = new Picasso.form.field.PicassoField();