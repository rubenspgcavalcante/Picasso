Picasso.load("Model");

/**
 * The picasso Model entity
 * @constructor
 * @extends Picasso.core,Subject
 */
Picasso.Model = function () {};

Picasso.Model.prototype = new Picasso.core.Subject();

/**
 * Default model constructor
 */
Picasso.Model.prototype.construct = function(){
    if(!this.hasOwnProperty("_seq")){
        var sequence = new Picasso.core.Sequence("Model");
        this._seq = sequence.nextVal();
    }
};

/**
 * Sets a property of the model
 * @param {string} property
 * @param {*} value
 */
Picasso.Model.prototype.set = function(property, value){
    if(this.hasOwnProperty(property)){
        this[property] = value;
        this.fire("propertyChange", {property: property, value: value});
    }
};

/**
 * Gets a model property value
 * @param {string} property
 * @return {*}
 */
Picasso.Model.prototype.get = function(property){
    if(this.hasOwnProperty(property)){
        return property;
    }
};

/**
 * Extends from a Model
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function (constructor) {
    return Picasso.utils.object.extend(constructor, Picasso.Model);
};
