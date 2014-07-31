var UserModel = Picasso.Model.extend(function () {
    this.construct();

    this.name = null;
    this.email = null;
    this.password = null;
    this.passwordConfirmation = null;
    this.address = null;
});