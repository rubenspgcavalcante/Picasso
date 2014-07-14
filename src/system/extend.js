Picasso.load("extend");

/**
 * Adds a extra field to the Picasso form
 * @param {string} fieldName The name to access this type of field
 * @param {function} Field Constructor of the field
 */
Picasso.extend.field = function (fieldName, Field) {
    var objUtil = Picasso.load("utils.object");
    var log = Picasso.load("utils.log");

    if (typeof Field != "function") {
        if (objUtil.isEmpty(Field.prototype)) {
            log.warn("Overriding the field prototype", Field);
        }

        Field.prototype = new Picasso.form.field.PicassoField;

        if (Picasso.form.field.hasOwnProperty(fieldName)) {
            log.warn("Overriding a already registered Picasso field " + fieldName);
        }

        Picasso.form.field[fieldName] = Field;
    }
};

/**
 * Adds a extra validator to the Picasso fields
 * @param {string} validatorName
 * @param {function} validator
 */
Picasso.extend.validator = function (validatorName, validator) {
    //TODO: Validator extend engine
};