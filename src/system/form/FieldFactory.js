Picasso.load("form.FieldFactory");

/**
 * A field factory
 * @constructor
 */
Picasso.form.FieldFactory = function(){
    var _constructField = function(field){
        /** @type {utils/html} */
        var htmlUtils = Picasso.load("utils.html");

        var formGroup = document.createElement("div");
        formGroup.setAttribute("class", "form-group");

        var fieldElement = document.createElement("input");
        htmlUtils.setAttributes(fieldElement, {
            id: field.id,
            type: field.type
        });
        htmlUtils.setAttributes(fieldElement, field.attrs);
        htmlUtils.addClass(fieldElement, "form-control");

        var labelElement = document.createElement("label");
        labelElement.setAttribute("class", "control-label");
        labelElement.innerHTML = field.label;

        formGroup.appendChild(labelElement);
        formGroup.appendChild(fieldElement);

        return formGroup;
    };

    /**
     * All the available field builders
     * Can be a method name or the function itself
     * @type {Object<string, string|Function>}
     */
    this.builders =  {
        text: _constructField,
        textArea: _constructField,
        email: _constructField,
        password: _constructField,
        submit: _constructField,
        cancel: _constructField
    };
};



/**
 * Constructs a simple field element
 * @param {Picasso.pjo.Field} field
 * @returns {HTMLDivElement}
 * @private
 */
Picasso.form.FieldFactory.prototype._constructField = function(field){
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    var formGroup = document.createElement("div");
    formGroup.setAttribute("class", "form-group");

    var fieldElement = document.createElement("input");
    htmlUtils.setAttributes(fieldElement, {
        id: field.id,
        type: field.type
    });
    htmlUtils.setAttributes(fieldElement, field.attrs);
    htmlUtils.addClass(fieldElement, "form-control");

    var labelElement = document.createElement("label");
    labelElement.setAttribute("class", "control-label");
    labelElement.innerHTML = field.label;

    formGroup.appendChild(labelElement);
    formGroup.appendChild(fieldElement);

    return formGroup;
};

/**
 * The default interface of a field builder method
 * @typedef Picasso.form.FieldFactory~fieldBuilderMethod
 * @type {Function}
 * @param {Picasso.pjo.Field} field
 */

/**
 * Strategy pattern to choose the right
 * field builder method
 * @type {Object<string, fieldBuilderMethod>}
 * @returns {Function}
 * @throws {Picasso.error.InvalidFieldType}
 * @private
 */
Picasso.form.FieldFactory.prototype._getBuilderByFieldType = function(fieldType){
    if(this.builders.hasOwnProperty(fieldType)){
        var builder = this.builders[fieldType];
        if(typeof builder === 'string'){
            return this[builder];
        }
        else{
            return builder;
        }
    }

    throw new Picasso.error.InvalidFieldType(fieldType);
};

/**
 * Builds a field element
 * @param {Picasso.pjo.Field} field
 * @returns {HTMLFieldSetElement} A simple field, or a composed field
 */
Picasso.form.FieldFactory.prototype.create = function(field){
    var builder = this._getBuilderByFieldType(field.type);
    return  builder(field);
};