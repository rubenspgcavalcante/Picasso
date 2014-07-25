var UserCreateView = Picasso.View.extend(function () {
    this.construct($(".formWrapper")[0]);

    /** @type {Picasso.form.PicassoForm} */
    this.form = null;

    var that = this;

    this.change = function () {
        alert("Render the view again");
    };
    this.register("update", this.change);

    var _bindEvents = function(){
        var $this = $(that.dom);
        $this.find("form").submit(function(){
            that.fire("create", that.form);
            return false;
        });

        $this.find("button[type=cancel]").click(function(){
            that.fire("showList");
        });

    };

    var _afterRender = function(){
        var mapField = that.form.getField("address");
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
        if(this.form != null){
            var fields = this.form.getFields();
            for(var i=0; i < fields.length; i++){
                $(fields[i].getHTMLElement()).removeClass("has-error");
            }
        }

        $(this.dom).find(".errors").html("").hide();
    };

    this.destroy = function(){
        $(that.dom).find(".form").remove();
        that.form = null;
        $(that.dom).hide();
    };

    this.render = function(user){
        this.clearErrors();

        $.get("form.json?nocache=" + new Date().getTime(), function(json){
            $(".prettyprint").html(JSON.stringify(json, null, 2));
            prettyPrint();

            that.form = that.buildForm(json);
            $(that.dom).append(that.form.getHTMLElement()).show();
            _bindEvents();
            _afterRender();
            if(typeof user != "undefined"){
                that.form.value(user);
            }
        }, "json");
    };
});