var ContactFormView = Picasso.View.extend(function () {
    this.construct($(".templateContainer")[0]);

    var that = this;
    var template = null;

    var _bindEvents = function () {
        var $this = $(that.dom);
        $this.find('.save').click(function () {
            that.fire("save", that.getForm());
            return false;
        });

        $this.find("button[type=cancel]").click(function () {
            that.fire("show-list");
        });
    };

    var _afterRender = function () {
        var mapField = that.getForm().getField("address");
        mapField.afterRender();
    };

    var _parseJSONForm = function (contact) {
        $.get("form.json?nocache=" + new Date().getTime(), function (json) {
            $(".prettyprint").html(JSON.stringify(json, null, 2));
            prettyPrint();

            that.setForm(that.buildForm(json));
            that.bindFormData();
            $(that.dom).find('.formWrapper').append(that.getForm().getHTMLElement());
            _bindEvents();
            _afterRender();
            if (typeof contact != "undefined") {
                that.getForm().value(contact);
            }
        }, "json");
    };

    var _compileTemplate = function (contact) {
        TemplateLoader.get('views/partials/ContactForm.html', function (template) {
            var compiled = _.template(template);
            $(that.dom).html(compiled());
            _parseJSONForm(contact);
        });
    };

    this.addValidationErrors = function (validations) {
        TemplateLoader.get('views/partials/ContactFormErrors.html', function (template) {
            var compiled = _.template(template);

            var errors = [];
            for (var i in validations) {
                if (validations.hasOwnProperty(i) && !validations[i].valid) {
                    errors.push(validations[i]);
                    validations[i].field.addClass('has-error');
                }
            }
            $(that.dom).find('#errors-container').html(compiled({validations: errors}));

        });
    };

    this.clearErrors = function () {
        if (this.getForm() != null) {
            var fields = this.getForm().getFields();
            for (var i = 0; i < fields.length; i++) {
                $(fields[i].getHTMLElement()).removeClass("has-error");
            }
        }
        $(this.dom).find(".errors").html("").hide();
    };

    this.destroy = function () {
        $(that.dom).find(".form").remove();
        that.setForm(null);
    };

    this.render = function (contact) {
        this.clearErrors();
        _compileTemplate(contact);
    };
});