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
     * @returns {?boolean}
     */
    this.validate = function (pField) {
        if (!pField.required || !pField.isEmpty()) {
            if (Picasso.form.validators.hasOwnProperty(pField.type)) {
                return Picasso.form.validators[pField.type](pField);
            }
            else {
                log.warn("No validator found to the field type " + pField.type, pField);
                return null;
            }
        }

        return false;
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
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i];
            if(!f.formIgnore){
                validation[f.getId()] = this.validate(f);
            }
        }

        return validation;
    };
};