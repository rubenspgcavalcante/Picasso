var ContactFormController = Picasso.Controller.extend(function (contact, formView) {
    this.construct(contact, formView);
    var that = this;

    var _validateForm = function(form){
        var validations = that.validator.validateForm(form);
        formView.addValidationErrors(validations);
        return form.valid;
    };

    this.listen("save", function (event) {
        var form = event.data;
        if (_validateForm(form)) {
            var contact = form.value();
            DB.save(contact);
            this.fire('save-complete', event.data);
        }
    });

});