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
 * Translates a fieldGrid object into a set of HTML elements
 * @param {Picasso.pjo.FieldGrid} fieldGrid
 * @returns {HTMLDivElement}
 */
Picasso.form.Builder.prototype.buildFieldGrid = function (fieldGrid) {
    var fieldGridElement = document.createElement("div");
    this.htmlUtils.setAttributes(fieldGridElement, fieldGrid.attrs);
    fieldGridElement.setAttribute("id", fieldGrid.id);
    var colSizeClass = "col-xs-";
    colSizeClass += fieldGrid.colXSize || Picasso.pjo.FieldGrid.colSize.MEDIUM;

    this.htmlUtils.addClass(fieldGridElement, "column " + colSizeClass);

    var that = this;
    this.arrayUtils.each(fieldGrid.fields, function(field){
        var fieldElement = that.fieldFactory.create(field);
        fieldGridElement.appendChild(fieldElement);
    });

    return fieldGridElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {HTMLFormElement}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    formElement.setAttribute("role", "form");

    this.htmlUtils.setAttributes(formElement, form.attrs);

    var that = this;
    this.arrayUtils.each(form.fieldGrid, function(fieldSet){
        formElement.appendChild(that.buildFieldGrid(fieldSet));
    });

    return formElement;
};