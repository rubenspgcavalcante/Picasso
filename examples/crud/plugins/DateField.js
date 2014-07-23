/**
 * A custom date field
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.extend.field("DateField", function () {

        /**
         * Verify if the content of the field is valid
         * @param {jQuery} element
         * @returns {boolean}
         * @private
         */
        var _isValid = function (element) {
            var val = Number(element.val());
            var dateType = element.attr("name");

            if (dateType == "day") {
                return val > 0 && val <= 31;
            }
            else if (dateType == "month") {
                return val > 0 && val <= 12;
            }
            else if (dateType == "year") {
                return val > 1900 && val <= new Date().getFullYear();
            }

            return false;
        };

        /**
         * Binds all events to the field element
         * @param {jQuery} element
         * @private
         */
        var _bindEvents = function (element) {
            element.change(function (ev) {
                var $targ = $(ev.currentTarget);
                var val = Number($targ.val());

                if (isNaN(val) || !_isValid($targ)) {
                    $targ.val("");
                }
                else {
                    $targ.val(val);
                }
            });
        };

        /**
         * Builds the field
         * @param {Picasso.pjo.Field} field
         */
        this.build = function (field) {
            var element = $("<div>", {class: "form-group date-field"}).append(
                $("<label>", {class: "control-label"}).text(field.label),
                $("<div>", {class: "date-container col-sm-10"}).append(
                    $("<input>", {
                        type: "text",
                        name: "day",
                        class: "form-control date-field-day",
                        maxlength: 2,
                        placeholder: "dd"
                    }),

                    $("<span>").text("/"),

                    $("<input>", {
                        type: "text",
                        name: "month",
                        class: "form-control date-field-month",
                        maxlength: 2,
                        placeholder: "mm"
                    }),

                    $("<span>").text("/"),

                    $("<input>", {
                        type: "text",
                        name: "year",
                        class: "form-control date-field-year",
                        maxlength: 4,
                        placeholder: "yyyy"
                    })
                )
            );

            _bindEvents(element.find("input"));
            this.setHTMLElement(element[0]);
        };

        /**
         * Verifies if the field is empty or not
         * @returns {boolean}
         */
        this.isEmpty = function () {
            var $this = $(this.getHTMLElement());
            var val = this.value();

            return val.year == "" || val.month == "" || val.day == "";
        };

        /**
         * Returns or sets the value of a field
         * @param {year: *, month: *, day: *} val
         * @returns {{year: number, month: number, day: number}}
         */
        this.value = function (val) {
            var $this = $(this.getHTMLElement());

            if (typeof val != "undefined") {
                $this.find("[name=year]").val(val.year);
                $this.find("[name=month]").val(val.month);
                $this.find("[name=day]").val(val.day);
            }
            else {
                return {
                    year: Number($this.find("[name=year]").val()),
                    month: Number($this.find("[name=month]").val()),
                    day: Number($this.find("[name=day]").val())
                };
            }

        };

        /**
         * Resets the field
         */
        this.reset = function () {
            this.val({
                year: "",
                month: "",
                day: ""
            })
        };
    }
);

/**
 * Validates a date field object
 * @param {Picasso.form.field.PicassoField} pField
 * @returns {boolean}
 */
Picasso.extend.validator("DateField", function (pField) {
    var val = pField.value();
    var date = new Date(val.year, val.month - 1, val.day);

    return val.year == date.getFullYear() && val.month == date.getMonth()+1 && val.day == date.getDate();
});