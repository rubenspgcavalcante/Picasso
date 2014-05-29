Picasso.load("form.field.ButtonField");

/**
 * Default buttons constructor
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.ButtonField = function(){
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    /**
     * Builds the button field
     * @param {Picasso.pjo.Field} field
     */
    this.build = function(field){
        var buttomElement = document.createElement("button");
        htmlUtils.setAttributes(buttomElement, {
            id: field.id || "",
            type: field.type || "button",
            class: "btn btn-default"
        });

        htmlUtils.setAttributes(buttomElement, field.attrs);
        buttomElement.innerHTML = field.value;

        this.setHTMLElement(buttomElement);
    };
};

Picasso.form.field.ButtonField.prototype = new Picasso.form.field.PicassoField();