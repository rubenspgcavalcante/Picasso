(function (document) {
    var App = {};

    App.HelloModel = Picasso.Model.extend(function () {
        this.message = null;
    });

    App.MainController = Picasso.Controller.extend(function (model, view) {
        this.construct(model, view);
        var that = this;

        this.listen('click-on-button', function (event) {
            that.getModel().update(event.data);
            alert('Button has been clicked! The message is: ' + that.getModel().getMessage());
        });

        this.startApp = function(){
            view.render();
        };

    });

    App.FormView = Picasso.View.extend(function () {
        this.construct(document.getElementById('form-container'));
        var that = this;

        this.render = function () {
            var myForm = this.buildForm({
                id: 'my-form',
                grid: [{
                    id: 'form-grid',
                    columns: [
                        {
                            id: 'btnSection',
                            fields: [{
                                id: "clickBtn",
                                type: "button",
                                value: "click-me"
                            }]
                        },

                        {
                            id: 'inputSection',
                            fields: [{
                                id: "message",
                                type: "text",
                                label: "message"
                            }]
                        }
                    ]
                }]
            });
            this.setForm(myForm);
            this.bindFormData();

            this.dom.appendChild(this.getForm().getHTMLElement());
            document.getElementById('clickBtn').onclick = function () {
                that.fire('click-on-button', that.getForm().value());
            }
        };
    });


    var controller = new App.MainController(new App.HelloModel(), new App.FormView());
    controller.startApp();

})(document, window, undefined);
