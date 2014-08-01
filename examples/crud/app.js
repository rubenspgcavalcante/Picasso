var user;
$(document).ready(function(){
    var log = Picasso.load("utils.log");
    log.setLogLevel(log.lvs.INFO);

    user = new UserModel();
    var userCreateView = new UserCreateView();
    var userListView = new UserListView();
    var userCRUDController = new CRUDController(user, userListView, userCreateView);

    userListView.render();
});