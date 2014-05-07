Picasso.load("Controller");

/**
 * The picasso Controller entity
 * @param {Picasso.Model} model A model to associate to this controller
 * @param {Picasso.View} view A view to associate to this controller
 * @constructor
 */
Picasso.Controller = function (model, view) {};
/**
 * @type {Picasso.Model}
 * @protected
 */
Picasso.Controller.prototype._model = null;

/**
 * @type {Picasso.View}
 * @protected
 */
Picasso.Controller.prototype._view = null;

Picasso.Controller.prototype.construct = function(model, view){
    this._model = model;
    this._view = view;
    this._view.setModel(this._model);
};

/**
 * Extends from a Controller
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Controller.extend = function(constructor){
    return Picasso.utils.object.extend(constructor, Picasso.Controller);
};