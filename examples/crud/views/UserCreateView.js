var UserCreateView = Picasso.View.extend(function () {
    this.construct($(".formWrapper")[0]);
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

    this.render = function(){
        $.get("myform.json", function(json){
            that.form = that.buildForm(json);
            $(that.dom).append(that.form.getHTMLElement());
            _bindEvents();
        }, "json");
    };
});