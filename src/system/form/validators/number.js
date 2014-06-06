Picasso.load("form.validators.number");

/**
 * Default validation for number fields
 * @param {Picasso.form.field.PicassoField} numberField
 * @returns {boolean}
 */
Picasso.form.validators.number = function(numberField){
    var val = numberField.value();
    return !isNaN(Number(val));
};