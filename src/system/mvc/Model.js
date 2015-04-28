Picasso.load("Model");

/**
 * The picasso Model entity
 * @constructor
 * @extends Picasso.core,Subject
 */
Picasso.Model = function () {};
Picasso.Model.prototype = new Picasso.core.Subject();

/**
 * Sets a property of the model
 * @param {string} property
 * @param {*} value
 */
Picasso.Model.prototype.set = function (property, value) {
    if (this.hasOwnProperty(property)) {
        if (this[property] instanceof Picasso.Model) {
            this[property].update(value);
        }
        else {
            this[property] = value;
            this.fire("propertyChange", {property: property, value: value});
        }
    }
};

/**
 * Gets a model property value
 * @param {string} property
 * @return {*}
 */
Picasso.Model.prototype.get = function (property) {
    if (this.hasOwnProperty(property)) {
        return this[property];
    }
};

/**
 * Updates the properties of the model
 * @param {Object} plainModel
 */
Picasso.Model.prototype.update = function (plainModel) {
    for (var i in plainModel) {
        if (plainModel.hasOwnProperty(i)) {
            this.set(i, plainModel[i]);
        }
    }
};

/**
 * Returns the plain object of this model with
 * all the values
 * @return {Object}
 */
Picasso.Model.prototype.toPlainObject = function () {
    var pjo = new this.constructor();
    for (var property in pjo) {
        if (pjo.hasOwnProperty(property) && typeof pjo[property] != "function") {
            pjo[property] = this[property];
        }
    }
    return pjo;
};

/**
 * Extends from a Model
 * @static
 * @param {Function} Constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function (Constructor) {
    var metaData = [];
    var sampleModel = new Constructor();

    for (var attr in sampleModel) {
        if (sampleModel.hasOwnProperty(attr)) {
            metaData.push(attr);
        }
    }

    var Model = Picasso.utils.object.extend(Constructor, Picasso.Model);
    for (var i = 0; i < metaData.length; i++) {
        (function (attr) {

            var methodSuffix = attr.charAt(0).toUpperCase() + attr.slice(1);
            Model.prototype['set' + methodSuffix] = function (val) {
                this.set(attr, val);
            };

            Model.prototype['get' + methodSuffix] = function () {
                return this.get(attr);
            };
        }(metaData[i]));
    }

    return Model;
};
