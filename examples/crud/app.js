$(document).ready(function(){
    var user = new UserModel();
    var userCreateView = new UserCreateView();
    var userListView = new UserListView();

    var userCRUDController = new CRUDController(user, userListView, userCreateView);

    userListView.render();
});