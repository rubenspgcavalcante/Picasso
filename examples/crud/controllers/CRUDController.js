var CRUDController = Picasso.Controller.extend(function (model, lView, cView, eView) {
    this.construct(model, lView, cView, eView);

    this.listen("create", function (event) {
        console.log(event.data);
    });
});
