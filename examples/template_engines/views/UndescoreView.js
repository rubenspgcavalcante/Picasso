var UnderscoreView = Picasso.View.extend(function () {
    this.construct(document.getElementsByClassName('row-1'));
    var that = this;

    var _bindEvents = function () {
        $(that.dom).find('#underscore-btn').click(function () {
            that.fire('btn-click', 'underscore');
        });
    };

    this.render = function (panel) {
        $.get('templates/underscore.html', function (template) {
            var compile = _.template(template);
            $(that.dom).append(compile(panel));
            _bindEvents();
        });
    };

});