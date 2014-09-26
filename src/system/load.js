/**
 * Declares or loads already declared module/namespace
 * @example
 * // Declaring
 * Picasso.load("utils.array");
 * // Using
 * var arrayUtils = Picasso.load("utils.array");
 *
 * @param {string} namespace The module complete namespace
 * @return {Object} The loaded module
 */
Picasso.load = function (namespace) {
    var parts = namespace.split('.');
    var currentObj = Picasso;

    // strip redundant leading global
    if (parts[0] === "Picasso") {
        parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
        if (typeof currentObj[parts[i]] === "undefined") {
            currentObj[parts[i]] = {};
        }
        currentObj = currentObj[parts[i]];

    }
    return currentObj;
};


Picasso.load("loadField");
/**
 * Loads a field of the given type
 * @param {Picasso.pjo.Field} field
 * @returns {Picasso.form.field.PicassoField}
 */
Picasso.loadField = function (field) {
    var fieldFactory = new Picasso.form.FieldFactory();
    try {
        return fieldFactory.create(field);
    }
    catch (e) {
        var log = Picasso.load("utils.log");
        log.error(e.message);
        return null;
    }
};