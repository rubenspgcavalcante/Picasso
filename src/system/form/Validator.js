Picasso.load("form.Validator");

/**
 * Validates fields
 * @param {Picasso.form.Form} _form
 * @constructor
 */
Picasso.Validator = function (_form) {

    var log = Picasso.load("utils.log");
    var form = _form;

    /**
     * Validates a field
     * @param {Picasso.form.field.PicassoField} pField
     * @returns {boolean}
     */
    this.validate = function (pField) {
        if (pfield.required && !pfield.isEmpty()) {
            if (Picasso.validators.hasOwnProperty(pField.type)) {
                return Picasso.validators[pField.type](pField);
            }
            else {
                log.warn("No validator found to the field type " + pField.type, pField);
                return true;
            }
        }

        return false;
    };
};