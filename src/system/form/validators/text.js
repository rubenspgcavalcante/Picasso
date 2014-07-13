Picasso.load("form.validators.text");

/**
 * Default validation for text fields
 * @param {Picasso.form.field.PicassoField} textField
 * @returns {boolean}
 */
Picasso.form.validators.text = function(textField){
    return typeof textField.value() != "undefined";
};