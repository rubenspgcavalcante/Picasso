var ContactListController = Picasso.Controller.extend(function (contactCollection, listView) {
    this.construct(contactCollection, listView);
    var that = this;
    var formView = new ContactFormView();
    var formController = new ContactFormController(new ContactModel(), formView);

    var _showList = function () {
        formView.destroy();
        listView.render(that.getModel());
        listView.show();
    };

    var _showCreate = function (contact) {
        listView.hide();
        formView.render(contact);
    };

    this.listen("show-create", function () {
        _showCreate();
    });

    this.listen("show-list", function () {
        _showList();
    });

    this.listen("show-edit", function (event) {
        var contact = new ContactModel();
        contact.update(DB.get(event.data));
        _showCreate(contact);
    });

    this.listen("save-complete", function (event) {
        if(this.getModel().getElement(event.data) != null){
            that.getModel().updateElement(formController.getModel());
        }
        else {
            that.getModel().addElement(DB.get(event.data));
        }
        _showList();
    });

    this.listen("delete", function (event) {
        DB.remove(event.data);
        that.getModel().removeElement(event.data);
        _showList();
    });

    this.startApp = function () {
        listView.render(this.getModel());
    };
});