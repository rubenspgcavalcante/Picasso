var ContactFormView = Picasso.View.extend(function () {
    this.construct($(".formWrapper")[0]);

    var that = this;

    var _bindEvents = function(){
        var $this = $(that.dom);
        $this.find("form").submit(function(){
            that.fire("save", that.getForm());
            return false;
        });

        $this.find("button[type=cancel]").click(function(){
            that.fire("show-list");
        });

    };

    var _afterRender = function(){
        var mapField = that.getForm().getField("address");
        mapField.afterRender();
    };

    this.addValidationError = function(validation){
        validation.field.addClass("has-error");
        var errors = validation.errorMessages;
        var $li = $("<li>").append(
            $("<span>").text(validation.field.getLabel()),
            $("<ul>")
        );

        for(var i=0; i < errors.length; i++){
            $li = $li.find("ul").append($("<li>").text(errors[i])).end();
        }
        $(this.dom).find(".errors").append($li).show();
    };

    this.clearErrors = function(){
        if(this.getForm() != null){
            var fields = this.getForm().getFields();
            for(var i=0; i < fields.length; i++){
                $(fields[i].getHTMLElement()).removeClass("has-error");
            }
        }
        $(this.dom).find(".errors").html("").hide();
    };

    this.destroy = function(){
        $(that.dom).find(".form").remove();
        that.setForm(null);
        $(that.dom).hide();
    };

    this.render = function(contact){
        this.clearErrors();

        $.get("form.json?nocache=" + new Date().getTime(), function(json){
            $(".prettyprint").html(JSON.stringify(json, null, 2));
            prettyPrint();

            that.setForm(that.buildForm(json));
            that.bindFormData();
            $(that.dom).append(that.getForm().getHTMLElement()).show();
            _bindEvents();
            _afterRender();
            if(typeof contact != "undefined"){
                that.getForm().value(contact);
            }
        }, "json");
    };
});