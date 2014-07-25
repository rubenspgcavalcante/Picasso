Picasso.load("form.validators.text");

/**
 * Default validation for text fields
 * @param {Picasso.form.field.PicassoField} textField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.text = function(textField){
    var validation = new Picasso.pjo.Validation();
    validation.field = textField;

    validation.valid = typeof textField.value() != "undefined";
    if(!validation.valid){
        validation.errorMessages.push("Field value is undefined");
    }

    return validation;
};