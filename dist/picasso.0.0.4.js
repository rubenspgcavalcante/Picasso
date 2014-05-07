/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

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

// -- End of load virtual comments -- //

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "Rubens Pinheiro Gonçalves Cavalcante",
    version: "0.0.4",
    build: "2014-05-06",
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
 * @param {String} namespace The module complete namespace
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
Picasso.load("pjo.Event");

/**
 * The default event object
 * @param {String} name
 * @param {*} data
 * @param {Object} target
 * @constructor
 */
Picasso.pjo.Event = function PicassoEvent(name, data, target) {
    /** @type String */
    this.name = name || "any";

    /** @type * */
    this.data = data || null;

    /** @type Object */
    this.target = target || null;
};
Picasso.load("pjo.EventHandler");

/**
 * Default event handler
 * @param {String} eventName
 * @param {Function||String} callback
 * @param {Object} context
 * @constructor
 */
Picasso.pjo.EventHandler = function (eventName, callback, context) {
    /** @type String */
    this.eventName = eventName || "";

    /** @type Function */
    this.callback = callback || new Function();

    /** @type Object */
    this.context = context || null;
};
Picasso.load("error.InvalidParameters");

/**
 * Invalid parameters error
 * @param {String} funcName The name of the function that are throwing this error
 * @param {Object<String, String>} errorParameters A map of parameter/error message type
 * @param {Object} context The context that the error occurred
 * @extends {Error}
 * @constructor
 */
Picasso.error.InvalidParameters = function (funcName, errorParameters, context) {
    this.msg = "The function " + funcName + " has received invalid parameters";
    this.errorParameters = errorParameters || null;
    this.context = context || null;
};

Picasso.error.InvalidParameters.prototype = new Error();
Picasso.load("Picasso.utils.array");
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

        // Public API
        return {
            find: find,
            equals: equals
        }

    }()
    );
Picasso.load("Picasso.utils.object");
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
            equals: equals
        }

    }()
    );
Picasso.load("core.Sequence");
Picasso.core.Sequence = (function () {
    /**
     * Stores all the sequences
     * @type {Object<String, number>}
     * @private
     * @static
     */
    var _registeredEntities = {};

    /**
     * Validates and if necessary starts a new sequence
     * based on the given entity name
     * @param {String} entityName The entity name
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
     * @param {String} entity The entity name
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
     * @type {Object<String, Picasso.pjo.EventHandler[]>}
     */
    var handlers = {};

    /**
     * Visits all the associated handlers to the given event
     * and call it or remove it
     * @param {String} action
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
     * @param {String} eventType
     * @param {Function} callback
     * @param {Object} context
     * @throws Picasso.error.InvalidParameters
     */
    this.subscribe = function (eventType, callback, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("subscribe", {eventType: "obrigatory"}, this.subscribe);
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
     * @param {String} eventType
     * @param {Function} callback
     * @param {Object} context
     * @throws {Picasso.error.InvalidParameters}
     */
    this.unsubscribe = function (eventType, callback, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("usubscribe", {eventType: "obrigatory"}, this.unsubscribe);
        }

        if (typeof callback == "undefined" && typeof context == "undefined") {
            delete handlers[eventType];
        }
        else {
            _visit("unsubscribe", new Picasso.pjo.Event(eventType, [], context), callback);
        }
    };

    /**
     * Fires a event, calling all the observers
     * of this event
     * @param {String} eventType
     * @param {*} eventData
     * @param {Object} context
     * @throws {Picasso.error.InvalidParameters}
     */
    this.fire = function (eventType, eventData, context) {
        if (typeof  eventType == "undefined") {
            throw new Picasso.error.InvalidParameters("fire", {eventType: "obrigatory"}, this.fire);
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
 * @static
 * @param {Function} constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function(constructor){
    return Picasso.utils.object.extend(constructor, Picasso.Model);
};

Picasso.Model.prototype = new Picasso.core.Subject();
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