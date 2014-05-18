Picasso.load("form.Builder");

Picasso.form.Builder = function () {
    // Dependence
    this.arr = Picasso.load("utils.array");
};

/**
 * Set the given elements to the HTML object
 * @param {Object} attrs
 * @param {HTMLElement} element
 * @private
 */
Picasso.form.Builder.prototype._setAttributes = function (attrs, element) {
    for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
            element.setAttribute(attr, attrs[attr]);
        }
    }
};

/**
 * Translates a fieldSet object into a HTML element
 * @param {Picasso.pjo.FieldSet} fieldSet
 * @returns {HTMLFieldSetElement}
 */
Picasso.form.Builder.prototype.buildFieldSet = function (fieldSet) {
    var fieldSetElement = document.createElement("fieldSet");
    fieldSetElement.setAttribute("id", fieldSet.id);
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {HTMLFormElement}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    var formElement = document.createElement("form");
    formElement.setIdAttribute("id", form.id);
    this._setAttributes(form.attrs, formElement);

    var that = this;
    this.arr.each(form.fieldSets, function(fieldSet){
        formElement.appendChild(that.buildFieldSet(fieldSet));
    });

    return formElement;
};