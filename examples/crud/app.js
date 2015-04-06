$(document).ready(function () {
    var log = Picasso.load("utils.log");
    log.setLogLevel(log.lvs.INFO);

    var contactList = new Picasso.Collection(ContactModel);
    contactList.addElements(DB.list());

    var contactListView = new ContactListView();
    var contactListController = new ContactListController(contactList, contactListView);

    contactListController.startApp();
});