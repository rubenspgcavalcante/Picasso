Picasso.load("form.FieldFactory");

/**
 * A field factory
 * @constructor
 */
Picasso.form.FieldFactory = function(){
    /**
     * All the available field constructors
     * Can be a method name or the function itself
     * @type {Object<string, string|Picasso.form.field.PicassoField>}
     */
    this.constructors =  {
        text: Picasso.form.field.InputField,
        textArea: Picasso.form.field.InputField,
        email: Picasso.form.field.InputField,
        password: Picasso.form.field.InputField,
        submit: Picasso.form.field.InputField,
        cancel: Picasso.form.field.InputField
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
 * Strategy pattern to choose the right
 * field builder method
 * @param {string} fieldType
 * @returns {Picasso.form.field.PicassoField.constructor}
 * @throws {Picasso.error.InvalidFieldType}
 * @private
 */
Picasso.form.FieldFactory.prototype._getFieldConstructorByFieldType = function(fieldType){
    if(this.constructors.hasOwnProperty(fieldType)){
        var fieldConstructor = this.constructors[fieldType];
        if(typeof fieldConstructor === 'string'){
            return this[fieldConstructor];
        }
        else{
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
Picasso.form.FieldFactory.prototype.create = function(field){
    var FieldConstructor = this._getFieldConstructorByFieldType(field.type);
    var picassoField = new FieldConstructor();
    picassoField.build(field);

    return picassoField;
};