Picasso.load("form.validators.text");

/**
 * Default validation for text fields
 * @param {Picasso.form.field.PicassoField} emailField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.email = function (emailField) {
    var validation = new Picasso.pjo.Validation();
    validation.field = emailField;

    validation.valid = typeof emailField.value() != "undefined";
    if (!validation.valid && emailField.isRequired()) {
        validation.errorMessages.push("Field value is undefined");
    }

    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!emailRegex.test(emailField.value()) && emailField.isRequired()) {
        validation.valid = false;
        validation.errorMessages.push("Field contains a invalid email");
    }

    return validation;
};