Picasso.load("Controller");

/**
 * The picasso Controller entity
 * @param {Picasso.Model} model A model to associate to this controller
 * @param {Picasso.View} view A view to associate to this controller
 * @constructor
 */
Picasso.Controller = function (model, view) {};

/**
 * All the UI action events are stored here
 * @type {Picasso.pjo.EventHandler[]}
 * @private
 */
Picasso.Controller.prototype._UIActions = [];

/**
 * @type {Picasso.Model}
 * @protected
 */
Picasso.Controller.prototype._model = null;

/**
 * @type {Object<Number, String, Picasso.View>}
 * @protected
 */
Picasso.Controller.prototype._views = {};

/**
 * Listen all registered UIActions to a view
 * @param {Picasso.View} view
 * @private
 */
Picasso.Controller.prototype._registerUIAction = function(view){
    var l = this._uiActions.length;
    for(var i = 0; i < l; i++){
        var evHandler = this._uiActions[i];
        view.subscribe(evHandler.eventName, evHandler.callback);
    }
};

/**
 * The Default Controller constructor
 * @param {Picasso.Model} model
 */
Picasso.Controller.prototype.construct = function(model){
    this._model = model;
    this._view.setModel(this._model);
};

/**
 * Registers a view to this controller
 * @param {Picasso.View} view
 */
Picasso.Controller.prototype.registerView = function(view){
    this._views[view._seq] = view;
    this._registerUIAction(view);
};

/**
 * Register a uiAction (event) to a controller callback
 * @param {String} uiActionName
 * @param {Function} callback
 */
Picasso.Controller.listen = function(uiActionName, callback){
    var uiAcion = new Picasso.pjo.EventHandler(uiActionName, callback, this);
    this._UIActions.push(uiAcion);

    for(var i in this._views){
        if(this._views.hasOwnProperty(i)){
            this._views[i].subscribe(uiActionName, callback);
        }
    }
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