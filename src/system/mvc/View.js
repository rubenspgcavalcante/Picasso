Picasso.load("View");

/**
 * The picasso View entity
 * @constructor
 * @extends Picasso.core.Subject
 */
Picasso.View = function () {

    /**
     * @type {Picasso.Model}
     * @protected
     */
    this._model = null;

    /**
     * @type {Object<String, Function||String>}
     * @protected
     */
    this._modelEvents = {};

    /**
     * @type {Object}
     * @protected
     */
    this._uiActions = {};

    /**
     * The main object of the view
     * @type {HTMLObjectElement}
     * @public
     */
    this.dom = null;

};
Picasso.View.prototype = new Picasso.core.Subject();

/**
 * Default constructor of a view
 * @param {HTMLObjectElement} dom
 */
Picasso.View.prototype.construct = function(dom){
    Picasso.View.apply(this, arguments);
    this.dom = dom || document;
};

/**
 * Set a model to this view
 * @param {Picasso.Model} model
 */
Picasso.View.prototype.setModel = function(model){
    this._model = model;
    for(var i in this._modelEvents){
        if(this._modelEvents.hasOwnProperty(i)){
            this._model._subscribe(i, this._modelEvents[i], this);
        }
    }
};

/**
 * Registers a model event
 * @param {String} eventName
 * @param {Function} method
 */
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