Picasso.load("form.validators.hidden");

/**
 * Default validation for hidden fields
 * @param {Picasso.form.field.PicassoField} hiddenField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.hidden = function(hiddenField){
    var validation = new Picasso.pjo.Validation();
    validation.valid = true;

    return validation;
};