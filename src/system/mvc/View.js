Picasso.load("View");

/**
 * The picasso View entity
 * @constructor
 * @extends Picasso.core.Subject
 */
Picasso.View = function(){

};

/**
 * Extends from a View
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.View.extend = function(constructor){
    return Picasso.utils.object.extend(constructor, Picasso.View);
};

Picasso.View.prototype = new Picasso.core.Subject();