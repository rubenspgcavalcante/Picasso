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
 * @param {Picasso.pjo.FormGroup} formGroup
 * @returns {HTMLFieldSetElement}
 */
Picasso.form.Builder.prototype.buildFormGroup = function (formGroup) {
    var formGroupElement = document.createElement("div");
    formGroupElement.setAttribute("id", formGroup.id);
    formGroupElement.setAttribute("class", "form-group");

    this.htmlUtils.setAttributes(formGroup.attrs, formGroupElement);

    var that = this;
    this.arrayUtils.each(formGroup.fields, function(field){
        var fieldElement = that.fieldFactory.create(field);
        formGroupElement.appendChild(fieldElement);
    });

    return formGroupElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {HTMLFormElement}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    formElement.setAttribute("class", "form-horizontal");
    formElement.setAttribute("role", "form");

    this.htmlUtils.setAttributes(form.attrs, formElement);

    var that = this;
    this.arrayUtils.each(form.fieldSets, function(fieldSet){
        formElement.appendChild(that.buildFormGroup(fieldSet));
    });

    return formElement;
};