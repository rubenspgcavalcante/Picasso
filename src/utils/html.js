Picasso.load("utils.html");
Picasso.utils.html = (

/**
 * HTML and DOM utils
 * @exports utils/html
 */
    function () {

        /**
         * Set the given elements to the HTML object
         * @param {HTMLElement} element
         * @param {Object} attrs
         * @public
         */
        var setAttributes = function (element, attrs) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.setAttribute(attr, attrs[attr]);
                }
            }
        };

        /**
         * Add a class to a element
         * @param {HTMLElement} element An HTML element to add the classes
         * @param {string} _class One or more classes separated by space
         */
        var addClass = function (element, _class) {
            var classes = element.classList;
            var toAppend, i;

            if (_class.indexOf(' ') != -1) {
                toAppend = _class.split(' ');
            }
            else {
                toAppend = [_class]
            }

            for (i = 0; i < toAppend.length; i++) {
                if (!classes.contains(toAppend[i])) {
                    classes.add(toAppend[i]);
                }
            }
        };

        /**
         * Remove a class of a element
         * @param {HTMLElement} element
         * @param {string} _class
         */
        var removeClass = function (element, _class) {
            var classes = element.classList;
            var toRemove, i;

            if (_class.indexOf(' ') != -1) {
                toRemove = _class.split(' ');
            }
            else {
                toRemove = [_class]
            }

            for (i = 0; i < toRemove.length; i++) {
                if (!classes.contains(toRemove[i])) {
                    classes.remove(toRemove[i]);
                }
            }
        };

        // Public API
        return {
            setAttributes: setAttributes,
            addClass: addClass,
            removeClass: removeClass
        };
    }()
    );

