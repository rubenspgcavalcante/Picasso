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
        this[property] = value;
        this.fire("propertyChange", {property: property, value: value});
    }
};

/**
 * Gets a model property value
 * @param {string} property
 * @return {*}
 */
Picasso.Model.prototype.get = function (property) {
    if (this.hasOwnProperty(property)) {
        return property;
    }
};

/**
 * Updates the properties of the model
 * @param {Object} plainModel
 */
Picasso.Model.prototype.update = function(plainModel){
    for(var i in plainModel){
        if(plainModel.hasOwnProperty(i)){
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
    return Picasso.utils.object.extend(Constructor, Picasso.Model);
};
