var ContactFormController = Picasso.Controller.extend(function (contact, formView) {
    this.construct(contact, formView);
    var that = this;
    var saveCallback = new Function();

    var _validateForm = function(form){
        var validations = that.validator.validateForm(form);
        formView.addValidationErrors(validations);
        return form.valid;
    };

    this.onSaveComplete = function(callback){
        saveCallback = callback;
    };

    this.listen("save", function (event) {
        var form = event.data;
        if (_validateForm(form)) {
            var contact = form.value();
            DB.save(contact);
            saveCallback(event.data);
        }
    });

});