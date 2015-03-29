var CRUDController = Picasso.Controller.extend(function (model, lView, cView) {
    this.construct(model, lView, cView);

    var that = this;
    var listView = lView;
    var createView = cView;

    var _showList = function(){
        createView.destroy();
        listView.render();
        listView.show();
    };

    var _showCreate = function(contact){
        listView.hide();
        createView.render(contact);
    };

    var _validateForm = function(form){
        var validations = that.validator.validateForm(form);
        var valid = true;
        createView.clearErrors();

        for(var i in validations){
            var errors = {};
            if(validations.hasOwnProperty(i)){
                if(validations[i].valid != null && !validations[i].valid){
                    createView.addValidationError(validations[i]);
                    valid = false;
                }
            }
        }
        return valid;
    };

    this.listen("showCreate", function(){
        _showCreate();
    });

    this.listen("showList", function(){
        _showList();
    });

    this.listen("create", function (event) {
        var form = event.data;
        if(_validateForm(form)){
            var contact = form.value();
            DB.save(contact);
            _showList();
        }
    });

    this.listen("showEdit", function(event){
        var contact = DB.get(event.data);
        that.getModel().update(contact);
        _showCreate(that.getModel());
    });

    this.listen("delete", function(event){
        DB.remove(event.data);
        _showList();
    });
});
