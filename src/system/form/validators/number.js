Picasso.load("form.validators.number");

/**
 * Default validation for number fields
 * @param {Picasso.form.field.PicassoField} numberField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.number = function (numberField) {
    var val = numberField.value();
    var validation = new Picasso.pjo.Validation();
    validation.field = numberField;

    validation.valid = !isNaN(Number(val));
    if (!validation.valid) {
        validation.errorMessages.push("Field value is not a number");
    }
};