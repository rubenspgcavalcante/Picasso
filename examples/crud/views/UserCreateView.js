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

    this.destroy = function(){
        $(that.dom).find(".form").remove();
        that.form = null;
        $(that.dom).hide();
    };

    this.render = function(user){
        $.get("myform.json", function(json){
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