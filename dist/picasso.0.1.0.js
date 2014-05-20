/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

/**
 * @alias Picasso
 */
var P = P || Picasso;

// -- Namespace virtual comments -- //

/**
 * Declares the plain javascript object constructors
 * @namespace {Object} Picasso.pjo
 */

/**
 * All the system core objects
 * @namespace {Object} Picasso.core
 */

/**
 * All the system errors objects
 * @namespace {Object} Picasso.error
 */

/**
 * All the utils modules
 * @namespace {Object} Picasso.utils
 */

/**
 * The dynamic form builder namespace
 * @namespace {Object} Picasso.form
 */

// -- End of load virtual comments -- //

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "Rubens Pinheiro Gonçalves Cavalcante",
    version: "0.1.0",
    build: "2014-05-18",
    license: "GPLv3"
};
/**
 * Declares or loads already declared module/namespace
 * @example
 * // Declaring
 * Picasso.load("utils.array");
 * // Using
 * var arrayUtils = Picasso.load("utils.array");
 *
 * @param {string} namespace The module complete namespace
 * @return {Object} The loaded module
 */
Picasso.load = function (namespace) {
    var parts = namespace.split('.');
    var currentObj = Picasso;

    // strip redundant leading global
    if (parts[0] === "Picasso") {
        parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
        if (typeof currentObj[parts[i]] === "undefined") {
            currentObj[parts[i]] = {};
        }
        currentObj = currentObj[parts[i]];

    }
    return currentObj;
};
Picasso.load("error.InvalidFieldType");

/**
 * Invalid field type used
 * @param {string} fieldType
 * @constructor
 * @extends Error
 */
Picasso.error.InvalidFieldType = function(fieldType){
    this.name = "InvalidFieldType";
    this.message = "Can't find a constructor. Invalid field type " + String(fieldType);
};

Picasso.error.InvalidFieldType.prototype = Error.prototype;
Picasso.error.InvalidFieldType.constructor = Picasso.error.InvalidFieldType;
Picasso.load("error.InvalidParameters");

/**
 * Invalid parameters error
 * @param {string} funcName The name of the function that are throwing this error
 * @param {Object<string, String>} errorParameters A map of parameter/error message type
 * @param {Object} context The context that the error occurred
 * @extends {Error}
 * @constructor
 */
Picasso.error.InvalidParameters = function (funcName, errorParameters, context) {

    this.name = "InvalidParameters";

    this.message = "The function " + funcName + " has received invalid parameters\n";
    var template = "\tparameter %param%: %dependence%;\n";

    for(var i in errorParameters){
        if(errorParameters.hasOwnProperty(i)){
            this.message += template.replace("%param%", i).replace("%dependence%", errorParameters[i]);
        }
    }

    this.errorParameters = errorParameters || null;
    this.context = context || null;
};

Picasso.error.InvalidParameters.prototype = Error.prototype;
Picasso.error.InvalidParameters.constructor = Picasso.error.InvalidParameters;
Picasso.load("utils.array");
Picasso.utils.array = (

    /**
     * A set of array utils
     * @exports utils/array
     */
    function () {

        // Depedences
        /**
         * Object utils
         * @type module:utils/object
         * @private
         */
        var objUtil = Picasso.load("Picasso.utils.object");


        /**
         * Finds a element into the array
         * @param {Array} arr A array to search into
         * @param {*} element The element to find
         * @return {boolean} If the element was found
         * @public
         */
        var find = function (arr, element) {
            for (var i = 0; i < arr.length; i++) {
                if (typeof arr[i] == 'object' && typeof element == 'object') {
                    if (objUtil.equals(arr[i], element)) {
                        return true;
                    }
                }
                else {
                    if (arr[i] === element) {
                        return true;
                    }
                }
            }

            return false;
        };

        /**
         * Compares two arrays and verify if their are equals
         * @param {Array} arr1 First array
         * @param {Array} arr2 Second array
         * @return {boolean} If they are equals
         * @public
         */
        var equals = function (arr1, arr2) {
            if (arr1.length != arr2.length) return false;

            for (var i = 0; i < arr2.length; i++) {
                if (!find(arr1, arr2[i])) {
                    return false;
                }
            }

            return true;
        };

        /**
         * 'For each' callback
         * @callback module:utils/array.eachCallback
         * @param {*} element Current element of the iteration
         * @param {number} index The current index
         */

        /**
         * Iterates over a array, executing a callback
         * to each element
         * @param {Array} arr
         * @param {module:utils/array.eachCallback} call
         * @public
         */
        var each = function (arr, call) {
            if(typeof arr === "undefined"){
                return;
            }

            var i, l;

            l = arr.length;
            for (i = 0; i < l; i++) {
                call(arr[i], i);
            }
        };

        // Public API
        return {
            find: find,
            equals: equals,
            each: each
        }

    }()
);
Picasso.load("utils.html");
Picasso.utils.html = (

    /**
     * HTML and DOM utils
     * @exports utils/html
     */
    function () {

        /**
         * Set the given elements to the HTML object
         * @param {Object} attrs
         * @param {HTMLElement} element
         * @public
         */
        var setAttributes = function (attrs, element) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.setAttribute(attr, attrs[attr]);
                }
            }
        };

        // Public API
        return {
            setAttributes: setAttributes
        };
    }()
);


Picasso.load("utils.object");
Picasso.utils.object = (
    /**
     * A set of object utils
     * @exports utils/object
     */
    function () {

        /**
         * Extends a constructor
         * @param {Function} Class The object constructor
         * @param {Function} Parent The parent object constructor
         * @returns {Function} The Class constructor
         */
        var extend = function(Class, Parent){
            //Rent a prototype
            var Rented = new Function();
            Rented.prototype = Parent.prototype;
            Class.prototype = new Rented();
            Class._super = Parent.prototype;
            Class.prototype.constructor = Class;

            return Class;
        };


        /**
         * 'For each' callback
         * @callback utils/object.eachCallback
         * @param {*} value
         * @param {string} property
         */

        /**
         * Iterates over a object properties
         * @param {Object} obj
         * @param {module:utils/object.eachCallback} call
         */
        var each = function(obj, call){
            if(obj instanceof Object) {
                var property;
                for (property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        call(obj[property], property);
                    }
                }
            }
        };

        /**
         * Compares two objects and
         * verify if they are equals
         * @param {Object} obj2
         * @return {Boolean}
         * @public
         */
        var equals = function (obj1, obj2) {
            var path;
            for (path in obj1) {
                if (typeof(obj2[path]) == 'undefined') {
                    return false;
                }
            }

            for (path in obj1) {
                if (obj1[path]) {
                    switch (typeof(obj1[path])) {
                        case 'object':
                            if (!obj1[path].equals(obj2[path])) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof(obj2[path]) == 'undefined' ||
                                (path != 'equals' && obj1[path].toString() != obj2[path].toString())
                                ) {
                                return false;
                            }
                            break;
                        default:
                            if (obj1[path] != obj2[path]) {
                                return false;
                            }
                    }
                }
                else {
                    if (obj2[path]) {
                        return false;
                    }
                }
            }

            for (path in obj2) {
                if (typeof(obj1[path]) == 'undefined') {
                    return false;
                }
            }

            return true;
        };

        // Public API
        return {
            extend: extend,
            equals: equals,
            each: each
        }
    }()
);
Picasso.load("core.Sequence");
Picasso.core.Sequence = (function () {
    /**
     * Stores all the sequences
     * @type {Object<string, number>}
     * @private
     * @static
     */
    var _registeredEntities = {};

    /**
     * Validates and if necessary starts a new sequence
     * based on the given entity name
     * @param {string} entityName The entity name
     * @return {boolean}
     * @private
     * @static
     */
    var _validateAndStartSequence = function (entityName) {
        if (typeof entityName == "undefined" || typeof entityName != "string") {
            return false;
        }

        if (!_registeredEntities.hasOwnProperty(entityName)) {
            _registeredEntities[entityName] = null;
        }

        return true;
    };

    /**
     * Controls a sequence of the given entity. </br>
     * Take note that this is the real Sequence constructor.
     *
     * @param {string} entity The entity name
     * @constructor
     * @alias Picasso.core.Sequence
     * @example
     * var userSeq = new Picasso.core.Sequence("User");
     * var secUserSeq = new Picasso.core.Sequence("User");
     *
     * secUserSeq.currentVal(); // returns 0
     * userSeq.nextVal(); // returns 1
     * secUserSeq.currentVal(); // returns 1
     */
    var SeqConstructor = function (entity) {
        this._entity = entity;
    };


    /**
     * View the sequence current value
     * @return {?number} The current sequence value or null
     * to a invalid entity name
     * @public
     */
    SeqConstructor.prototype.currentVal = function () {
        if (_validateAndStartSequence(this._entity)) {
            return _registeredEntities[this._entity];
        }

        return null;
    };

    /**
     * Get the next val of a sequence and increments it
     * @return {number} The current sequence value
     * @public
     */
    SeqConstructor.prototype.nextVal = function () {
        if (_validateAndStartSequence(this._entity)) {
            if (_registeredEntities[this._entity] == null) {
                _registeredEntities[this._entity] = 0;
                return 0;
            }
            return ++_registeredEntities[this._entity];
        }

        return null;
    };

    return SeqConstructor

}());

Picasso.load("core.Subject");

/**
 * The subject constructor
 * See the observer design pattern
 * @constructor
 */
Picasso.core.Subject = function () {

    /**
     * All the event handlers (Observers) are stored here
     * @type {Object<string, Picasso.pjo.EventHandler[]>}
     */
    var handlers = {};

    /**
     * Visits all the associated handlers to the given event
     * and call it or remove it
     * @param {string} action
     * @param {Picasso.pjo.Event} event
     * @private
     */
    var _visit = function (action, event, callback) {

        var evListeners = handlers[event.name] || [];
        for (var i = 0; i < evListeners.length; i++) {
            if (action == "fire") {
                var cbk = evListeners[i].callback;
                if(typeof cbk == "string" && evListeners[i].context.hasOwnProperty(cbk)){
                    evListeners[i].context[cbk](event);
                }
                else{
                    evListeners[i].callback.call(evListeners.context, event);
                }
            }
            else if (evListeners[i].callback === callback && (event.context == null || evListeners.context === event.context)) {
                evListeners.splice(i, 1);
            }
        }

    };

    /**
     * Subscribes a new observer
     * @param {string} eventType
     * @param {Function} callback
     * @param {Object} context
     * @throws Picasso.error.InvalidParameters
     * @protected
     */
    this._subscribe = function (eventType, callback, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("_subscribe", {eventType: "obrigatory"}, this._subscribe);
        }

        if (!handlers.hasOwnProperty(eventType)) {
            handlers[eventType] = [];
        }

        var handler = new Picasso.pjo.EventHandler(eventType, callback, context || this);
        handlers[eventType].push(handler);
    };

    /**
     * Removes a observer of a event.
     * If, only the eventType is given, removes all observers of
     * this event type. If callback is given, removes all observers
     * that calls this callback. And finnaly, if context is given too,
     * removes if match the eventType, callback and context.
     * @param {string} eventType
     * @param {Function} callback
     * @param {Object} context
     * @throws {Picasso.error.InvalidParameters}
     * @protected
     */
    this._unsubscribe = function (eventType, callback, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("usubscribe", {eventType: "obrigatory"}, this._unsubscribe);
        }

        if (typeof callback == "undefined" && typeof context == "undefined") {
            delete handlers[eventType];
        }
        else {
            _visit("_unsubscribe", new Picasso.pjo.Event(eventType, [], context), callback);
        }
    };

    /**
     * Fires a event, calling all the observers
     * of this event
     * @param {string} eventType
     * @param {*} eventData
     * @param {Object} context
     * @throws {Picasso.error.InvalidParameters}
     */
    this.fire = function (eventType, eventData, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("fire", {eventType: "String"}, this.fire);
        }

        _visit("fire", new Picasso.pjo.Event(eventType, eventData, context || this));
    }
};

Picasso.load("Controller");

/**
 * The picasso Controller entity
 * @param {Picasso.Model} model A model to associate to this controller
 * @param {Picasso.View} view A view to associate to this controller
 * @constructor
 */
Picasso.Controller = function (model, view) {
    /**
     * All the UI action events are stored here
     * @type {Picasso.pjo.EventHandler[]}
     * @private
     */
    this._UIActions = [];

    /**
     * @type {Picasso.Model}
     * @protected
     */
    this._model = null;

    /**
     * @type {Object<number, String, Picasso.View>}
     * @protected
     */
    this._views = {};
};

/**
 * Listen all registered UIActions to a view
 * @param {Picasso.View} view
 * @private
 */
Picasso.Controller.prototype._registerUIAction = function (view) {
    var l = this._UIActions.length;
    for (var i = 0; i < l; i++) {
        var evHandler = this._UIActions[i];
        view._subscribe(evHandler.eventName, evHandler.callback);
    }
};

/**
 * The Default Controller constructor
 * @param {Picasso.Model} model
 * @param {...Picasso.View}
 */
Picasso.Controller.prototype.construct = function (model) {
    Picasso.Controller.apply(this, arguments);

    this._model = model;
    var l = arguments.length;
    if (l > 1) {
        for (var i = 1; i < l; i++) {
            if (arguments[i] instanceof Picasso.View) {
                this.registerView(arguments[i]);
                arguments[i].setModel(model);
            }
        }
    }
};

/**
 * Registers a view to this controller
 * @param {Picasso.View} view
 */
Picasso.Controller.prototype.registerView = function (view) {
    view.setModel(this._model);
    this._views[view._seq] = view;
    this._registerUIAction(view);
};

/**
 * Register a uiAction (event) to a controller callback
 * @param {string} uiActionName
 * @param {Function} callback
 */
Picasso.Controller.prototype.listen = function (uiActionName, callback) {
    var uiAcion = new Picasso.pjo.EventHandler(uiActionName, callback, this);
    this._UIActions.push(uiAcion);

    for (var i in this._views) {
        if (this._views.hasOwnProperty(i)) {
            this._views[i]._subscribe(uiActionName, callback);
        }
    }
};

/**
 * Extends from a Controller
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Controller.extend = function (constructor) {
    return Picasso.utils.object.extend(constructor, Picasso.Controller);
};
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
     * @type {Object<string, Function>}
     * @protected
     */
    this._modelEvents = {};

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
Picasso.load("form.Builder");

/**
 * Translates and builds a form from
 * a object to HTML elements
 * @constructor
 */
Picasso.form.Builder = function () {
    //Load dependencies

    /** @type {utils/array} */
    this.arrayUtils = Picasso.load("utils.array");

    /** @type {utils/html} */
    this.htmlUtils = Picasso.load("utils.html");

    /**@type {Picasso.form.FieldFactory} */
    this.fieldFactory = new Picasso.form.FieldFactory();
};

/**
 * Translates a fieldSet object into a HTML element
 * @param {Picasso.pjo.FormGroup} fieldSet
 * @returns {HTMLFieldSetElement}
 */
Picasso.form.Builder.prototype.buildFormGroup = function (fieldSet) {
    var fieldSetElement = document.createElement("fieldSet");
    fieldSetElement.setAttribute("id", fieldSet.id);
    this.htmlUtils.setAttributes(fieldSet.attrs, fieldSetElement);

    var that = this;
    this.arrayUtils.each(fieldSet.fields, function(field){
        var fieldElement = that.fieldFactory.create(field);
        fieldSetElement.appendChild(fieldElement);
    });

    return fieldSetElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {HTMLFormElement}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    this.htmlUtils.setAttributes(form.attrs, formElement);

    var that = this;

    this.arrayUtils.each(form.fieldSets, function(fieldSet){
        formElement.appendChild(that.buildFormGroup(fieldSet));
    });

    return formElement;
};
Picasso.load("form.FieldFactory");

/**
 * A field factory
 * @constructor
 */
Picasso.form.FieldFactory = function(){
};

/**
 * All the available field builders
 * Can be a method name or the function itself
 * @type {Object<string, string|Function>}
 */
Picasso.form.FieldFactory.prototype.builders =  {
    text: "_constructField",
    textArea: "_constructField",
    email: "_constructField",
    password: "_constructField",
    submit: "_constructField",
    cancel: "_constructField"
};

/**
 * Constructs a simple field element
 * @param {Picasso.pjo.Field} field
 * @returns {HTMLFieldSetElement}
 * @private
 */
Picasso.form.FieldFactory.prototype._constructField = function(field){
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");
    var fieldElement = document.createElement("field");

    fieldElement.setAttribute("id", field.id);
    fieldElement.setAttribute("type", field.type);
    htmlUtils.setAttributes(field.attrs, fieldElement);

    return fieldElement;
};

/**
 * The default interface of a field builder method
 * @typedef Picasso.form.FieldFactory~fieldBuilderMethod
 * @type {Function}
 * @param {Picasso.pjo.Field} field
 */

/**
 * Strategy pattern to choose the right
 * field builder method
 * @type {Object<string, fieldBuilderMethod>}
 * @returns {Function}
 * @throws {Picasso.error.InvalidFieldType}
 * @private
 */
Picasso.form.FieldFactory.prototype._getBuilderByFieldType = function(fieldType){
    if(this.builders.hasOwnProperty(fieldType)){
        var builder = this.builders[fieldType];
        if(typeof builder === 'string'){
            return this[builder];
        }
        else{
            return builder;
        }
    }

    throw new Picasso.error.InvalidFieldType(fieldType);
};

/**
 * Builds a field element
 * @param {Picasso.pjo.Field} field
 * @returns {HTMLFieldSetElement} A simple field, or a composed field
 */
Picasso.form.FieldFactory.prototype.create = function(field){
    var builder = this._getBuilderByFieldType(field.type);
    return  builder(field);
};
Picasso.load("form.Renderer");

/**
 * Manage the render of a dynamic form
 * @param {HTMLElement} container
 * @constructor
 */
Picasso.form.Renderer = function (container) {
    this.container = container;
};

/**
 * Builds and renders the given form
 * @param {Picasso.pjo.Form} form
 */
Picasso.form.Renderer.prototype.render = function(form) {

};