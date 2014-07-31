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

    /** @type {utils/object} */
    this.objUtils = Picasso.load("utils.object");

    /**@type {Picasso.form.FieldFactory} */
    this.fieldFactory = new Picasso.form.FieldFactory();
};

/**
 * Translates a columns object into a set of HTML elements
 * @param {Picasso.pjo.Column} col
 * @param {Picasso.form.PicassoForm} pForm
 * @returns {HTMLDivElement}
 */
Picasso.form.Builder.prototype.buildColumn = function (col, pForm) {
    col = this.objUtils.deserialize(col, Picasso.pjo.Column);

    var column = document.createElement("div");
    this.htmlUtils.setAttributes(column, col.attrs);
    column.setAttribute("id", col.id);

    var colSizeClass = "col-xs-";
    colSizeClass += col.colXSize || Picasso.pjo.Column.colSize.MEDIUM;

    this.htmlUtils.addClass(column, "column " + colSizeClass);

    var that = this;
    this.arrayUtils.each(col.fields, function (field) {
        var picassoField = that.fieldFactory.create(field);
        pForm.addField(picassoField);

        column.appendChild(picassoField.getHTMLElement());
    });

    return column;
};

/**
 * Translates a serialized grid into a HTML div
 * @param {Picasso.pjo.Grid} grid
 * @param {Picasso.form.PicassoForm} pForm
 */
Picasso.form.Builder.prototype.buildGrid = function (grid, pForm) {
    grid = this.objUtils.deserialize(grid, Picasso.pjo.Grid);

    var that = this;
    var divElement = document.createElement("div");

    if (grid.legend != null || grid.legend != "") {
        var legend = document.createElement("p");
        legend.innerHTML = grid.legend;
        this.htmlUtils.addClass(legend, "bg-info");
        divElement.appendChild(legend);
    }

    this.htmlUtils.setAttributes(divElement, grid.attrs);
    divElement.setAttribute('id', grid.id);
    this.htmlUtils.addClass(divElement, "grid-block");

    this.arrayUtils.each(grid.columns, function (fieldSet) {
        divElement.appendChild(that.buildColumn(fieldSet, pForm));
    });

    return divElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {Picasso.form.PicassoForm}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    form = this.objUtils.deserialize(form, Picasso.pjo.Form);
    var pForm = new Picasso.form.PicassoForm();

    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    formElement.setAttribute("role", "form");
    formElement.setAttribute("novalidate", "novalidate");

    this.htmlUtils.setAttributes(formElement, form.attrs);

    var that = this;
    this.arrayUtils.each(form.grid, function (block) {
        formElement.appendChild(that.buildGrid(block, pForm));
    });

    pForm.setHTMLElement(formElement);
    return pForm;
};