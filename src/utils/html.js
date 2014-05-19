Picasso.load("utils.html");
Picasso.utils.html = (

    /**
     * HTML and DOM utils
     * @exports utils/html
     */
    function () {

        /**
         * Set the given elements to the HTML object
         * @param {Object} attrs
         * @param {HTMLElement} element
         * @public
         */
        var setAttributes = function (attrs, element) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.setAttribute(attr, attrs[attr]);
                }
            }
        };

        // Public API
        return {
            setAttributes: setAttributes
        };
    }()
);

