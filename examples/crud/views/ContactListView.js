var ContactListView = Picasso.View.extend(function () {
    this.construct($(".tableContainer")[0]);
    var that = this;

    var _getLine = function (contact) {
        var btnIcon = $('<i class="btn-addon glyphicon"></i>');

        var editBtn = $("<button>", {class: "edit btn btn-xs btn-info"}).html(
            btnIcon.clone().addClass('glyphicon-pencil').text(" Edit")
        );
        editBtn.data("id", contact.id);

        var removeBtn = $("<button>", {class: "delete btn btn-xs btn-danger"}).html(
            btnIcon.clone().addClass('glyphicon-remove').text(" Delete")
        );
        removeBtn.data("id", contact.id);

        return $("<tr>").append(
            $("<td>").text(contact.name),
            $("<td>").text(contact.email),
            $("<td>").html(editBtn),
            $("<td>").html(removeBtn)
        )
    };

    var _buildTableLines = function (contacts) {
        var $table = $(that.dom).find("tbody").html("").end();

        for (var i = 0; i < contacts.length; i++) {
            $table = $table.find("tbody").append(_getLine(contacts[i])).end();
        }
        return $table;
    };

    var _bindEvents = function () {
        $(that.dom).find(".btn-create").unbind("click").click(function () {
            that.fire("show-create");
        });

        $(that.dom).find("tbody .edit").click(function () {
            that.fire("show-edit", $(this).data("id"));
        });

        $(that.dom).find("tbody .delete").click(function () {
            if (confirm('Are you sure you want delete this contact?')) {
                that.fire("delete", $(this).data("id"));
            }
        });
    };

    this.hide = function () {
        $(this.dom).hide();
    };

    this.show = function () {
        $(this.dom).show();
    };

    this.render = function (contacts) {
        $(this.dom).find(".tableContainer").html(_buildTableLines(contacts));
        _bindEvents();
    };
});