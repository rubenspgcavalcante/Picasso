Picasso.load("form.FieldFactory");

/**
 * A field factory
 * @constructor
 */
Picasso.form.FieldFactory = function () {};

/**
 * All the available field constructors
 * Can be a method name or the function itself
 * @type {Object<string, string|Picasso.form.field.PicassoField.constructor>}
 * @static
 */
Picasso.form.FieldFactory.constructors = (function(){
    return {
        hidden: Picasso.form.field.HiddenField,
        text: Picasso.form.field.InputField,
        textArea: Picasso.form.field.InputField,
        email: Picasso.form.field.InputField,
        password: Picasso.form.field.InputField,

        submit: Picasso.form.field.ButtonField,
        cancel: Picasso.form.field.ButtonField,
        button: Picasso.form.field.ButtonField
    }
})();

/**
 * Sets some picasso attributes to the html field element
 * @param {Picasso.form.field.PicassoField} pField
 * @private
 */
Picasso.form.FieldFactory.prototype._setPicassoAttributes = function (pField) {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    if (pField.required) {
        htmlUtils.addClass(pField.getHTMLElement(), "prequired");
    }

    if (pField.formIgnore) {
        htmlUtils.addClass(pField.getHTMLElement(), "pform-ignore");
    }
};

/**
 * Strategy pattern to choose the right
 * field builder method
 * @param {string} fieldType
 * @returns {Picasso.form.field.PicassoField.constructor}
 * @throws {Picasso.error.InvalidFieldType}
 * @private
 */
Picasso.form.FieldFactory.prototype._getFieldConstructorByFieldType = function (fieldType) {
    var constructors = this.constructor.constructors;
    if (constructors.hasOwnProperty(fieldType)) {
        var fieldConstructor = constructors[fieldType];
        if (typeof fieldConstructor === 'string') {
            return this[fieldConstructor];
        }
        else {
            return fieldConstructor;
        }
    }

    throw new Picasso.error.InvalidFieldType(fieldType);
};

/**
 * Builds a field element
 * @param {Picasso.pjo.Field} field
 * @returns {Picasso.form.field.PicassoField} The picasso field object
 */
Picasso.form.FieldFactory.prototype.create = function (field) {
    var objUtils = Picasso.load("utils.object");
    field = objUtils.deserialize(field, Picasso.pjo.Field);

    var FieldConstructor = this._getFieldConstructorByFieldType(field.type);
    var picassoField = new FieldConstructor();
    picassoField.__postConstructor__(field.label, field.type, field.required, field.formIgnore);
    picassoField.build(field);

    if (field.hasOwnProperty("id")) {
        picassoField.setId(field.id);
    }

    if(field.value != null){
        picassoField.value(field.value);
    }

    this._setPicassoAttributes(picassoField);
    return picassoField;
};