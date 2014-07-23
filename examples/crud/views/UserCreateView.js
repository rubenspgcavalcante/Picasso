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

    };

    var _afterRender = function(){
        var mapField = that.form.getField("address");
        mapField.afterRender();
    };

    this.render = function(){
        $.get("myform.json", function(json){
            $(".prettyprint").html(JSON.stringify(json, null, 4));
            prettyPrint();

            that.form = that.buildForm(json);
            $(that.dom).append(that.form.getHTMLElement());
            _bindEvents();
            _afterRender();
        }, "json");
    };
});