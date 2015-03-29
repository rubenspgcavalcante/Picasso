$(document).ready(function(){
    var log = Picasso.load("utils.log");
    log.setLogLevel(log.lvs.INFO);

    var user = new ContactModel();
    var userCreateView = new ContactCreateView();
    var userListView = new ContactListView();
    var userCRUDController = new CRUDController(user, userListView, userCreateView);

    userListView.render();
});