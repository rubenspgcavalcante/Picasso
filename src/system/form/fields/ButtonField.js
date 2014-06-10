Picasso.load("form.field.ButtonField");

/**
 * Default buttons constructor
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.ButtonField = function () {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    /**
     * Verify if the button is empty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return false;
    };

    /**
     * Gets the value of the button
     * @returns {*}
     */
    this.value = function () {
        return this._element.value;
    };

    /**
     * Builds the button field
     * @param {Picasso.pjo.Field} field
     */
    this.build = function (field) {
        this.setId(field.id);

        var buttomElement = document.createElement("button");
        htmlUtils.setAttributes(buttomElement, {
            id: this.getId(),
            type: field.type || "button",
            class: "btn btn-default"
        });

        htmlUtils.setAttributes(buttomElement, field.attrs);
        buttomElement.innerHTML = field.value;
        this.formIgnore = true;

        this.setHTMLElement(buttomElement);
    };
};

Picasso.form.field.ButtonField.prototype = new Picasso.form.field.PicassoField();