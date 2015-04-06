var ContactFormController = Picasso.Controller.extend(function (contact, formView) {
    this.construct(contact, formView);
    var that = this;

    var _validateForm = function(form){
        var validations = that.validator.validateForm(form);
        var valid = true;
        formView.clearErrors();

        for(var i in validations){
            if(validations.hasOwnProperty(i)){
                if(validations[i].valid != null && !validations[i].valid){
                    formView.addValidationError(validations[i]);
                    valid = false;
                }
            }
        }
        return valid;
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