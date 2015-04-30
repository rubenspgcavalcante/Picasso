(function (document) {
    var App = {};

    App.HelloModel = Picasso.Model(function () {
        this.message = null;
    });

    App.MainController = Picasso.Controller(function (model, view) {
        this.construct(model, view);

        this.listen('click', function (event) {
            console.log('Button has been clicked!');
        });

    });

    App.FormView = Picasso.View(function () {
        this.construct(document.getElementById('form-container'));

        this.render = function () {
            var myForm = this.buildForm({
                id: 'my-form',
                grid: {
                    id: 'form-grid',
                    collumns: [{
                        id: 'section',
                        fields: [{
                            id: "message",
                            type: "text",
                            label: "message"
                        }]
                    }]
                }
            });
            this.setForm(myForm);
        };
    });


    var hello = new App.HelloModel();
    var formView = new App.FormView();

    var controller = new App.MainController(hello, formView);
    formView.render();

})(document, window, undefined);
