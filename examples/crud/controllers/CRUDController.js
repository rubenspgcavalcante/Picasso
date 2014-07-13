var CRUDController = Picasso.Controller.extend(function (model, lView, cView, eView) {
    this.construct(model, lView, cView, eView);
    var self = this;

    this.listen("create", function (event) {
        var form = event.data;
        console.log(self.validator.validateForm(form));
    });
});
