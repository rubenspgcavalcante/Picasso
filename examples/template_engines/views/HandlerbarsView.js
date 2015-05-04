var HandlebarsView = Picasso.View.extend(function () {
    this.construct(document.getElementsByClassName('row-1'));
    var that = this;

    var _bindEvents = function () {
        $(that.dom).find('#handlebars-btn').click(function () {
            that.fire('btn-click', 'handlebars');
        });
    };

    this.render = function (panel) {
        $.get('templates/handlebars.html', function (template) {
            var compile = Handlebars.compile(template);
            $(that.dom).append(compile(panel));
            _bindEvents();
        });
    };
});