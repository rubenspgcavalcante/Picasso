var UserModel = Picasso.Model.extend(function () {
    this.construct();

    this.update = function (something) {
        this.something = something;
        this.fire("update");
    };
});