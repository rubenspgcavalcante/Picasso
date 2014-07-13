Picasso.load("form.validators.password");

/**
 * Default validation for password fields
 * @param {Picasso.form.field.PicassoField} passwordField
 * @returns {boolean}
 */
Picasso.form.validators.password = function(passwordField){
    return typeof passwordField.value() != "undefined";
};