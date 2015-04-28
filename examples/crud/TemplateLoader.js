var TemplateLoader = (function ($) {
    var cache = {};


    this.get = function (url, callback) {
        if (cache.hasOwnProperty(url)) {
            callback(cache[url]);
        }
        else {
            $.get(url, function (template) {
                cache[url] = template;
                callback(template);
            });
        }
    };

    return this;
})(jQuery);