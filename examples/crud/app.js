$(document).ready(function(){
    var user = new UserModel();
    var userCreateView = new UserCreateView();
    var userCRUDController = new CRUDController(user, userCreateView);

    userCreateView.render();
});