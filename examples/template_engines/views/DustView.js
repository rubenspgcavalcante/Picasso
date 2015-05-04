var DustView = Picasso.View.extend(function () {
    this.construct(document.getElementsByClassName('row-1'));
    var that = this;

    var _bindEvents = function () {
        $(that.dom).find('#dust-btn').click(function () {
            that.fire('btn-click', 'dust');
        });
    };

    this.render = function (panel) {
        $.get('templates/dust.html', function (template) {
            dust.renderSource(template, panel, function (err, out) {
                $(that.dom).append(out);
                _bindEvents();
            });
        });
    };

});