Picasso.load("View");

/**
 * The picasso View entity
 * @constructor
 * @extends Picasso.core.Subject
 */
Picasso.View = function () {
    var that = this;

    /**
     * @type {Picasso.Model}
     * @protected
     */
    this._model = null;

    /**
     * The view form
     * @type {Picasso.form.PicassoForm}
     * @private
     */
    this._form = null;

    /**
     * Stores the models events callbacks
     * @type {Object<string, Function>}
     * @protected
     */
    this._modelEvents = {};

    /**
     * The dynamic form builder
     * @type {Picasso.form.Builder}
     * @protected
     */
    this._formBuilder = new Picasso.form.Builder();

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
 * Binds the model properties to the form
 * fields.
 */
Picasso.View.prototype.bindFormData = function(){
    var that = this;
    this._model._subscribe("propertyChange", function(ev) {
        var property = ev.data.property;
        var value = ev.data.value;

        if (that._form != null) {
            var field = that._form.getField(property);
            field.value(value);
        }
    });
};

/**
 * Builds a picasso form object from the given JSON
 * @param {Object} formJSON
 * @returns {Picasso.form.PicassoForm}
 */
Picasso.View.prototype.buildForm = function(formJSON){
    return this._formBuilder.buildForm(formJSON);
};

/**
 * Sets the view form
 * @param {Picasso.form.PicassoForm} pForm
 */
Picasso.View.prototype.setForm = function(pForm){
    this._form = pForm;
};

/**
 * Gets the view form
 * @return {Picasso.form.PicassoForm}
 */
Picasso.View.prototype.getForm = function(){
    return this._form;
};

/**
 * Registers a model event
 * @param {string} eventName
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