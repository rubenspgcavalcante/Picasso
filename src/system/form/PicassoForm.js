Picasso.load("form.PicassoForm");

/**
 * The Picasso representation of a form
 * @constructor
 */
Picasso.form.PicassoForm = function () {

    /**
     * The form fields
     * @type {Object<string, Picasso.form.field.PicassoField>}
     * @private
     */
    var fields = {};

    /**
     * The HTML representation of this object
     * @type {HTMLFormElement}
     * @private
     */
    var element = null;

    /**
     * Adds a field to the form
     * @param {Picasso.form.field.PicassoField} pField
     */
    this.addField = function (pField) {
        fields[pField.getId()] = pField;
    };

    /**
     * Gets the form fields
     * @returns {Picasso.form.field.PicassoField[]}
     */
    this.getFields = function () {
        var res = [];
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                res.push(fields[i]);
            }
        }
        return res;
    };

    /**
     * Gets
     * @param {string} fieldId
     * @return {Picasso.form.field.PicassoField}
     */
    this.getField = function(fieldId){
        if(fields.hasOwnProperty(fieldId)){
            return fields[fieldId];
        }
    };

    /**
     * Sets the html element
     * @param {HTMLFormElement} htmlForm
     */
    this.setHTMLElement = function(htmlForm){
        element = htmlForm;
    };

    /**
     * Gets the html element
     * @returns {HTMLFormElement}
     */
    this.getHTMLElement = function(){
        return element;
    };

    /**
     * Gets the form value
     * returns {Object}
     */
    this.value = function(){
        var fields = this.getFields();
        var val = {};

        for(var i=0; i < fields.length; i++){
            var id = fields[i].getId();
            if(typeof id != "undefined" && !fields[i].formIgnore){
                val[id] = fields[i].value();
            }
        }

        return val;
    };
};
