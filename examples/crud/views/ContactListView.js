var ContactListView = Picasso.View.extend(function () {
    this.construct($(".templateContainer")[0]);
    var that = this;
    var template = null;

    var _bindEvents = function () {
        $(that.dom).find(".btn-create").unbind("click").click(function () {
            that.fire("show-create");
        });

        $(that.dom).find("tbody .edit").click(function () {
            that.fire("show-edit", $(this).data("element-id"));
        });

        $(that.dom).find("tbody .delete").click(function () {
            if (confirm('Are you sure you want delete this contact?')) {
                that.fire("delete", $(this).data("element-id"));
            }
        });
    };

    var _compileTemplate = function (templateStr, contacts) {
        var compiled = _.template(templateStr);
        that.destroy();
        $(that.dom).html(compiled({contacts: contacts}));
        _bindEvents();
    };

    this.destroy = function(){
        $(that.dom).find('.tableContainer').remove();
    };

    this.render = function (contacts) {
        if (template === null) {
            $.get('views/partials/ContactList.html', function (html) {
                template = html;
                _compileTemplate(template, contacts);
            });
        }
        else {
            _compileTemplate(template, contacts)
        }
    };
});