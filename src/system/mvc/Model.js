Picasso.load("Model");

/**
 * The picasso Model entity
 * @constructor
 * @extends Picasso.core,Subject
 */
Picasso.Model = function(){

};

/**
 * Extends from a Model
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function(constructor){
    return Picasso.utils.object.extend(constructor, Picasso.Model);
};

Picasso.Model.prototype = new Picasso.core.Subject();