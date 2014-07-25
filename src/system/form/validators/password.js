Picasso.load("form.validators.password");

/**
 * Default validation for password fields
 * @param {Picasso.form.field.PicassoField} passwordField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.password = function(passwordField){
    var validation = new Picasso.pjo.Validation();
    validation.field = passwordField;
    validation.valid = typeof passwordField.value() != "undefined";
    if(!validation.valid){
        validation.errorMessages.push("Field value is undefined");
    }

    return validation;
};