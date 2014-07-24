Picasso.load("form.field.InputField");

/**
 * The default 'input' builder
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.InputField = function () {
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
     * Gets/Sets the value of the input
     * @param {*} val
     * @returns {*}
     */
    this.value = function (val) {
        var el = this._element.getElementsByTagName("input")[0];
        if(typeof el != "undefined"){
            el.value = val;
        }
        else{
            return el.value;
        }
    };

    /**
     * The HTMLElement builder
     * @param {Picasso.pjo.Field} field
     * @return {HTMLElement}
     */
    this.build = function (field) {

        var formGroup = document.createElement("div");
        formGroup.setAttribute("class", "form-group");

        var fieldElement = document.createElement("input");
        htmlUtils.setAttributes(fieldElement, {
            name: field.id || "",
            type: field.type || "text"
        });

        htmlUtils.setAttributes(fieldElement, field.attrs);
        htmlUtils.addClass(fieldElement, "form-control");

        var labelElement = document.createElement("label");
        labelElement.setAttribute("class", "control-label");
        labelElement.innerHTML = field.label;

        formGroup.appendChild(labelElement);
        formGroup.appendChild(fieldElement);

        this.setHTMLElement(formGroup);
    };
};

Picasso.form.field.InputField.prototype = new Picasso.form.field.PicassoField();