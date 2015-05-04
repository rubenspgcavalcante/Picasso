(function () {
    var app = {};

    app.underscoreView = new UnderscoreView();
    app.handlebarsView = new HandlebarsView();
    app.dustView = new DustView();

    app.controller = new MainController(app.underscoreView, app.handlebarsView, app.dustView);
    app.controller.startApp();
})();