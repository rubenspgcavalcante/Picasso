Picasso.load("form.Builder");

/**
 * Translates and builds a form from
 * a object to HTML elements
 * @constructor
 */
Picasso.form.Builder = function () {
    //Load dependencies

    /** @type {utils/array} */
    this.arrayUtils = Picasso.load("utils.array");

    /** @type {utils/html} */
    this.htmlUtils = Picasso.load("utils.html");

    /**@type {Picasso.form.FieldFactory} */
    this.fieldFactory = new Picasso.form.FieldFactory();
};

/**
 * Translates a fieldSet object into a HTML element
 * @param {Picasso.pjo.FieldSet} fieldSet
 * @returns {HTMLFieldSetElement}
 */
Picasso.form.Builder.prototype.buildFieldSet = function (fieldSet) {
    var fieldSetElement = document.createElement("fieldSet");
    fieldSetElement.setAttribute("id", fieldSet.id);
    this.htmlUtils.setAttributes(fieldSet.attrs, fieldSetElement);

    var that = this;
    this.arrayUtils.each(fieldSet.fields, function(field){
        var fieldElement = that.fieldFactory.create(field);
        fieldSetElement.appendChild(fieldElement);
    });

    return fieldSetElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {HTMLFormElement}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    this.htmlUtils.setAttributes(form.attrs, formElement);

    var that = this;

    this.arrayUtils.each(form.fieldSets, function(fieldSet){
        formElement.appendChild(that.buildFieldSet(fieldSet));
    });

    return formElement;
};