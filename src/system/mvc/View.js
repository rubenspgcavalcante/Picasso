Picasso.load("View");

/**
 * The picasso View entity
 * @constructor
 * @extends Picasso.core.Subject
 */
Picasso.View = function () {};
Picasso.View.prototype = new Picasso.core.Subject();

/**
 * @type {Picasso.Model}
 * @protected
 */
Picasso.View.prototype._model = null;

/**
 * @type {Object<String, Function||String>}
 * @protected
 */
Picasso.View.prototype._modelEvents = {};

/**
 * @type {Object}
 * @protected
 */
Picasso.View.prototype._uiActions = {};

Picasso.View.prototype.setModel = function(model){
    this._model = model;
    for(var i in this._modelEvents){
        if(this._modelEvents.hasOwnProperty(i)){
            this._model.subscribe(i, this._modelEvents[i], this);
        }
    }
};

Picasso.View.prototype.register = function(eventName, method){
    this._modelEvents[eventName] = method;
};

/**
 * Extends from a View
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.View.extend = function(constructor){
    return Picasso.utils.object.extend(constructor, Picasso.View);
};