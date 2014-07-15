Picasso.load("extend");

/**
 * Adds a extra field to the Picasso form
 * @param {string} fieldName The name to access this type of field
 * @param {function} Field Constructor of the field
 * @throws {Picasso.error.InvalidParameters}
 */
Picasso.extend.field = function (fieldName, Field) {
    var objUtil = Picasso.load("utils.object");
    var log = Picasso.load("utils.log");

    if (typeof Field == "function") {
        if (!objUtil.isEmpty(Field.prototype)) {
            log.warn("Overriding the field prototype from given constructor", Field);
        }

        Field.prototype = new Picasso.form.field.PicassoField;

        if (Picasso.form.FieldFactory.constructors.hasOwnProperty(fieldName)) {
            log.warn("Overriding a already registered Picasso field " + fieldName);
        }

        Picasso.form.FieldFactory.constructors[fieldName] = Field;
    }

    else {
        throw new Picasso.error.InvalidParameters("Picasso.extend.field", {Field: "Invalid constructor"}, this);
    }
};

/**
 * Adds a extra validator to the Picasso fields
 * @param {string} fieldName
 * @param {function} validator
 * @throws {Picasso.error.InvalidParameters}
 */
Picasso.extend.validator = function (fieldName, validator) {
    var objUtil = Picasso.load("utils.object");
    var log = Picasso.load("utils.log");

    if (typeof validator == "function") {
        if (Picasso.form.validators.hasOwnProperty(fieldName)) {
            log.warn("Overriding a already registered Picasso field validator " + fieldName);
        }

        Picasso.form.validators[fieldName] = validator;
    }

    else {
        throw new Picasso.error.InvalidParameters("Picasso.extend.validator", {validator: "Invalid function"}, this);
    }
};