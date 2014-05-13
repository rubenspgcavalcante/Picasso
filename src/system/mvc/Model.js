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
 * Extends from a Model
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function (constructor) {
    return Picasso.utils.object.extend(constructor, Picasso.Model);
};
