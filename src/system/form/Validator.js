Picasso.load("form.Validator");

/**
 * Validates fields
 * @param {Picasso.form.Form} _form
 * @constructor
 */
Picasso.form.Validator = function (_form) {

    var log = Picasso.load("utils.log");
    var form = _form;

    /**
     * Validates a field
     * @param {Picasso.form.field.PicassoField} pField
     * @returns {Picasso.pjo.Validation}
     */
    this.validate = function (pField) {
        var validation = new Picasso.pjo.Validation();
        validation.field = pField;
        validation.valid = false;

        if (!pField.isRequired() || !pField.isEmpty()) {
            if (Picasso.form.validators.hasOwnProperty(pField.getType())) {
                return Picasso.form.validators[pField.getType()](pField);
            }
            else {
                log.warn("No validator found to the field type " + pField.getType(), pField);
                validation.valid = null;
                return validation;
            }
        }

        validation.errorMessages.push("Field is required");
        return validation;
    };

    /**
     * Validates a entire form, returning the id
     * and the validation value
     * @param {Picasso.form.PicassoForm} pForm
     * @returns {{string: boolean}}
     */
    this.validateForm = function (pForm) {
        var fields = pForm.getFields();
        var validation = {};
        var formValid = true;

        for (var i = 0; i < fields.length; i++) {
            var f = fields[i];
            if (!f.isFormIgnored()) {
                validation[f.getId()] = this.validate(f);

                //If there's no validator registered, the valid property is always null
                if (validation[f.getId()].valid !== null) {
                    formValid = formValid && !!validation[f.getId()].valid;
                }
            }
        }

        pForm.valid = formValid;
        return validation;
    };
};