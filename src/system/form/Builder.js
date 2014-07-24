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
 * Translates a fieldGrid object into a set of HTML elements
 * @param {Picasso.pjo.FieldGrid} fieldGrid
 * @param {Picasso.form.PicassoForm} pForm
 * @returns {HTMLDivElement}
 */
Picasso.form.Builder.prototype.buildFieldGrid = function (fieldGrid, pForm) {
    fieldGrid = this.objUtils.deserialize(fieldGrid, Picasso.pjo.FieldGrid);

    var fieldGridElement = document.createElement("div");
    this.htmlUtils.setAttributes(fieldGridElement, fieldGrid.attrs);
    fieldGridElement.setAttribute("id", fieldGrid.id);

    var colSizeClass = "col-xs-";
    colSizeClass += fieldGrid.colXSize || Picasso.pjo.FieldGrid.colSize.MEDIUM;

    this.htmlUtils.addClass(fieldGridElement, "column " + colSizeClass);

    var that = this;
    this.arrayUtils.each(fieldGrid.fields, function (field) {
        var picassoField = that.fieldFactory.create(field);
        pForm.addField(picassoField);

        fieldGridElement.appendChild(picassoField.getHTMLElement());
    });

    return fieldGridElement;
};

/**
 * Translates a serialized gridBlock into a HTML div
 * @param {Picasso.pjo.GridBlock} gridBlock
 * @param {Picasso.form.PicassoForm} pForm
 */
Picasso.form.Builder.prototype.buildGridBlock = function (gridBlock, pForm) {
    gridBlock = this.objUtils.deserialize(gridBlock, Picasso.pjo.GridBlock);

    var that = this;
    var divElement = document.createElement("div");

    if (gridBlock.legend != null || gridBlock.legend != "") {
        var legend = document.createElement("p");
        legend.innerHTML = gridBlock.legend;
        this.htmlUtils.addClass(legend, "bg-info");
        divElement.appendChild(legend);
    }

    this.htmlUtils.setAttributes(divElement, gridBlock.attrs);
    divElement.setAttribute('id', gridBlock.id);
    this.htmlUtils.addClass(divElement, "grid-block");

    this.arrayUtils.each(gridBlock.fieldGrid, function (fieldSet) {
        divElement.appendChild(that.buildFieldGrid(fieldSet, pForm));
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
    this.arrayUtils.each(form.gridBlocks, function (block) {
        formElement.appendChild(that.buildGridBlock(block, pForm));
    });

    pForm.setHTMLElement(formElement);
    return pForm;
};