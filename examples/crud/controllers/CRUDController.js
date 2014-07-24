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

    var _showCreate = function(user){
        listView.hide();
        createView.render(user);
    };

    var _validForm = function(form){
        var validations = that.validator.validateForm(form);
        for(var i in validations){
            if(validations.hasOwnProperty(i)){
                if(validations[i] !=null && !validations[i]){
                    return false;
                }
            }
        }

        return true;
    };

    this.listen("showCreate", function(){
        _showCreate();
    });

    this.listen("showList", function(){
        _showList();
    });

    this.listen("create", function (event) {
        var form = event.data;
        if(_validForm(form)){
            var user = form.value();
            DB.save(user);
            _showList();
        }
        else{
            alert("Invalid form");
        }
    });

    this.listen("showEdit", function(event){
        var user = DB.get(event.data);
        _showCreate(user);
    });

    this.listen("delete", function(event){
        DB.remove(event.data);
        _showList();
    });
});
