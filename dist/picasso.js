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
 * Reunites functions to augment Picasso functionality
 * @namespace {Object} Picasso.extend
 */

/**
 * The dynamic form builder namespace
 * @namespace {Object} Picasso.form
 */

/**
 * All the field constructors are stores here
 * @namespace {Object} Picasso.form.field
 */

// -- End of load virtual comments -- //

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "Rubens Pinheiro Gonçalves Cavalcante",
    version: "0.8.1",
    build: "2014-09-29",
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


Picasso.load("loadField");
/**
 * Loads a field of the given type
 * @param {Picasso.pjo.Field} field
 * @returns {Picasso.form.field.PicassoField}
 */
Picasso.loadField = function (field) {
    var fieldFactory = new Picasso.form.FieldFactory();
    try {
        return fieldFactory.create(field);
    }
    catch (e) {
        var log = Picasso.load("utils.log");
        log.error(e.message);
        return null;
    }
};
Picasso.load("extend");

/**
 * Adds a extra field to the Picasso form
 * @param {string} fieldName The name to access this type of field
 * @param {function} Field Constructor of the field
 * @throws {Picasso.error.InvalidParameters}
 */
Picasso.extend.field = function (fieldName, Field) {
    var objUtil = Picasso.load("utils.object");
    var log = Picasso.load("utils.log");

    if (typeof Field == "function") {
        if (!objUtil.isEmpty(Field.prototype)) {
            log.warn("Overriding the field prototype from given constructor", Field);
        }

        Field.prototype = new Picasso.form.field.PicassoField;

        if (Picasso.form.FieldFactory.constructors.hasOwnProperty(fieldName)) {
            log.warn("Overriding a already registered Picasso field " + fieldName);
        }

        Picasso.form.FieldFactory.constructors[fieldName] = Field;
    }

    else {
        throw new Picasso.error.InvalidParameters("Picasso.extend.field", {Field: "Invalid constructor"}, this);
    }
};

/**
 * Adds a extra validator to the Picasso fields
 * @param {string} fieldName
 * @param {function} validator
 * @throws {Picasso.error.InvalidParameters}
 */
Picasso.extend.validator = function (fieldName, validator) {
    var objUtil = Picasso.load("utils.object");
    var log = Picasso.load("utils.log");

    if (typeof validator == "function") {
        if (Picasso.form.validators.hasOwnProperty(fieldName)) {
            log.warn("Overriding a already registered Picasso field validator " + fieldName);
        }

        Picasso.form.validators[fieldName] = validator;
    }

    else {
        throw new Picasso.error.InvalidParameters("Picasso.extend.validator", {validator: "Invalid function"}, this);
    }
};
Picasso.load("pjo.Event");

/**
 * The default event object
 * @param {string} name
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
 * @param {string} eventName
 * @param {Function|String} callback
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
Picasso.load("pjo.Column");

/**
 * An form fieldset
 * @constructor
 */
Picasso.pjo.Column = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {number} */
    this.index = 0;

    /** @type {Picasso.pjo.Column.colSize} */
    this.colXSize = 3;

    /** @type {Picasso.pjo.Field[]} */
    this.fields = [];
};

/**
 * The size of the grid columns
 * @enum {string}
 * @readonly
 */
Picasso.pjo.Column.colSize = {
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4
};
Picasso.load("pjo.Field");

/**
 * A form field
 * @constructor
 */
Picasso.pjo.Field = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {string} */
    this.label = "";

    /** @type {Picasso.pjo.Field.type} */
    this.type = null;

    /** @type {boolean} */
    this.required = false;

    /** @type {boolean} */
    this.formIgnore = false;

    /** @type {*} */
    this.value = null;

    /**
     * The field attributes
     * @type {{name: string}}
     */
    this.attrs = {
        name: ""
    };
};

/**
 * Available default field types
 * @readonly
 * @enum {string}
 */
Picasso.pjo.Field.type = {
    TEXT: "text",
    TEXTAREA: "textarea",
    NUMBER: "number",
    EMAIL: "email",
    PASSWORD: "password",
    SUBMIT: "submit",
    CANCEL: "cancel"
};
Picasso.load("pjo.Form");

/**
 * A form object representation
 * @constructor
 */
Picasso.pjo.Form = function(){
     /** @type {string|number} */
    this.id = null;

    /**
     * The form attributes
     * @type {{action: string, method: string, name: string}}
     */
    this.attrs = {
        action: "",
        method: "",
        name: ""
    };

    /** @type {Picasso.pjo.Grid} */
    this.grid = null;
};
Picasso.load("pjo.Grid");

Picasso.pjo.Grid = function(){
    /** @type {string|number} */
    this.id = null;

    /** @type {string} */
    this.legend = null;

    /**
     * The element attributes
     * @type {{name: string}}
     */
    this.attrs = {};

    /** @type {Picasso.pjo.Column[]} */
    this.columns = [];
};
Picasso.load("pjo.Validation");

/**
 * A validation object
 * @constructor
 */
Picasso.pjo.Validation = function () {

    /** @type {Picasso.form.field.PicassoField} */
    this.field = null;

    /** @type {string[]} */
    this.errorMessages = [];

    /**0@type {boolean} */
    this.valid = false;

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
Picasso.load("error.NotImplementedError");

/**
 * Invalid field type used
 * @param {string} constructor
 * @param {string} method
 * @constructor
 * @extends Error
 */
Picasso.error.NotImplementedError = function(constructor, method){
    this.name = "NotImplementedError";
    this.message = constructor + " object child must implement the " +  method + " method";
};

Picasso.error.NotImplementedError.prototype = Error.prototype;
Picasso.error.NotImplementedError.constructor = Picasso.error.NotImplementedError;

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
         * @param {HTMLElement} element
         * @param {Object} attrs
         * @public
         */
        var setAttributes = function (element, attrs) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.setAttribute(attr, attrs[attr]);
                }
            }
        };

        /**
         * Add a class to a element
         * @param {HTMLElement} element An HTML element to add the classes
         * @param {string} _class One or more classes separated by space
         */
        var addClass = function (element, _class) {
            var classes = element.classList;
            var toAppend, i;

            if (_class.indexOf(' ') != -1) {
                toAppend = _class.split(' ');
            }
            else {
                toAppend = [_class]
            }

            for (i = 0; i < toAppend.length; i++) {
                if (!classes.contains(toAppend[i])) {
                    classes.add(toAppend[i]);
                }
            }
        };

        /**
         * Remove a class of a element
         * @param {HTMLElement} element
         * @param {string} _class
         */
        var removeClass = function (element, _class) {
            var classes = element.classList;
            var toRemove, i;

            if (_class.indexOf(' ') != -1) {
                toRemove = _class.split(' ');
            }
            else {
                toRemove = [_class]
            }

            for (i = 0; i < toRemove.length; i++) {
                if (!classes.contains(toRemove[i])) {
                    classes.remove(toRemove[i]);
                }
            }
        };

        // Public API
        return {
            setAttributes: setAttributes,
            addClass: addClass,
            removeClass: removeClass
        };
    }()
    );


Picasso.load("utils.log");

Picasso.utils.log = (
/**
 * Defines a set of functions to log messages
 * @exports utils/log
 */
    function () {
        /**
         * The log levels
         * @enum {string}
         */
        var lvs = {
            ERROR: "error",
            WARN: "warn",
            INFO: "info",
            DISABLED: "disabled"
        };

        var currentLevel = lvs.DISABLED;

        /**
         * Shows info in the console
         * @param {string} msg
         * @param {object} context
         */
        var info = function (msg, context) {
            if (currentLevel == lvs.INFO) {
                context = context || "(no context informed)";
                console.info(msg, context);
            }
        };

        /**
         * Warning in the console
         * @param {string} msg
         * @param {object} context
         */
        var warn = function (msg, context) {
            if (currentLevel == lvs.INFO || currentLevel == lvs.WARN) {
                context = context || "(no context informed)";
                console.warn(msg, context);
            }
        };

        /**
         * Error in the console
         * @param {string} msg
         * @param {object} context
         */
        var error = function (msg, context) {
            if (currentLevel == lvs.INFO || currentLevel == lvs.WARN || currentLevel == lvs.ERROR) {
                context = context || "(no context informed)";
                console.error(msg, context);
            }
        };

        /**
         * Sets the level of the logger
         * @param {lvs} level
         */
        var setLogLevel = function(level){
            currentLevel = level;
        };

        /**
         * Get the log level
         * @return {lvs}
         */
        var getLogLevel = function(){
            return currentLevel;
        };

        return {
            lvs: lvs,
            info: info,
            warn: warn,
            error: error,
            setLogLevel: setLogLevel,
            getLogLevel: getLogLevel
        };
    }());

Picasso.load("utils.object");
Picasso.utils.object = (
/**
 * A set of object utils
 * @exports utils/object
 */
    function () {

        /**
         * Transforms a string delimited by "-"
         * to a camel case notation
         * @param {string} property
         * @returns {string}
         * @private
         */
        var _toCamelCase = function (property) {
            return property.toLowerCase().replace(/-(.)/g, function (match, g1) {
                return g1.toUpperCase();
            });
        };

        /**
         * Extends a constructor
         * @param {Function} Class The object constructor
         * @param {Function} Parent The parent object constructor
         * @returns {Function} The Class constructor
         */
        var extend = function (Class, Parent) {
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
        var each = function (obj, call) {
            if (obj instanceof Object) {
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
         * @param {Object} obj1
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

        /**
         * Converts the given object to the strict properties of
         * the plain object constructor
         * @param {Object} obj
         * @param {Object.constructor} plainObjectConstructor
         */
        var deserialize = function (obj, plainObjectConstructor) {
            var pjo = new plainObjectConstructor();
            var formattedObj = {};

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (i.indexOf("-") != -1) {
                        formattedObj[_toCamelCase(i)] = obj[i];
                    }
                    else {
                        formattedObj[i] = obj[i];
                    }
                }
            }

            for (var property in pjo) {
                if (pjo.hasOwnProperty(property) && formattedObj.hasOwnProperty(property)) {
                    pjo[property] = formattedObj[property];
                }
            }

            return pjo;
        };

        /**
         * Tests if a object is empty
         * @param {Object} obj
         * @returns {boolean}
         */
        var isEmpty = function(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    return false;
                }
            }

            return true;
        };

        // Public API
        return {
            extend: extend,
            equals: equals,
            each: each,
            deserialize: deserialize,
            isEmpty: isEmpty
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
     * @type {Object<string, Picasso.View>}
     * @protected
     */
    this._views = {};

    /**
     * Autowired form validator
     * @type {Picasso.form.Validator}
     * @public
     */
    this.validator = new Picasso.form.Validator();
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
 * Gets the model associated with this controller
 * @return {Picasso.Model}
 */
Picasso.Controller.prototype.getModel = function(){
    return this._model;
};

Picasso.Controller.prototype.setModel = function(model){
    for(var i in this._views){
        if(this._views.hasOwnProperty(i)){
            this._views[i].setModel(model);
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
 * Sets a property of the model
 * @param {string} property
 * @param {*} value
 */
Picasso.Model.prototype.set = function (property, value) {
    if (this.hasOwnProperty(property)) {
        this[property] = value;
        this.fire("propertyChange", {property: property, value: value});
    }
};

/**
 * Gets a model property value
 * @param {string} property
 * @return {*}
 */
Picasso.Model.prototype.get = function (property) {
    if (this.hasOwnProperty(property)) {
        return property;
    }
};

/**
 * Updates the properties of the model
 * @param {Object} plainModel
 */
Picasso.Model.prototype.update = function(plainModel){
    for(var i in plainModel){
        if(plainModel.hasOwnProperty(i)){
            this.set(i, plainModel[i]);
        }
    }
};

/**
 * Returns the plain object of this model with
 * all the values
 * @return {Object}
 */
Picasso.Model.prototype.toPlainObject = function () {
    var pjo = new this.constructor();
    for (var property in pjo) {
        if (pjo.hasOwnProperty(property) && typeof pjo[property] != "function") {
            pjo[property] = this[property];
        }
    }
    return pjo;
};

/**
 * Extends from a Model
 * @static
 * @param {Function} Constructor The constructor to extend
 * @returns {Function} The updated constructor
 */
Picasso.Model.extend = function (Constructor) {
    return Picasso.utils.object.extend(Constructor, Picasso.Model);
};

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
Picasso.load("form.validators.hidden");

/**
 * Default validation for hidden fields
 * @param {Picasso.form.field.PicassoField} hiddenField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.hidden = function(hiddenField){
    var validation = new Picasso.pjo.Validation();
    validation.valid = true;

    return validation;
};
Picasso.load("form.validators.number");

/**
 * Default validation for number fields
 * @param {Picasso.form.field.PicassoField} numberField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.number = function (numberField) {
    var val = numberField.value();
    var validation = new Picasso.pjo.Validation();
    validation.field = numberField;

    validation.valid = !isNaN(Number(val));
    if (!validation.valid) {
        validation.errorMessages.push("Field value is not a number");
    }
};
Picasso.load("form.validators.password");

/**
 * Default validation for password fields
 * @param {Picasso.form.field.PicassoField} passwordField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.password = function(passwordField){
    var validation = new Picasso.pjo.Validation();
    validation.field = passwordField;
    validation.valid = typeof passwordField.value() != "undefined";
    if(!validation.valid){
        validation.errorMessages.push("Field value is undefined");
    }

    return validation;
};
Picasso.load("form.validators.text");

/**
 * Default validation for text fields
 * @param {Picasso.form.field.PicassoField} textField
 * @returns {Picasso.pjo.Validation}
 */
Picasso.form.validators.text = function(textField){
    var validation = new Picasso.pjo.Validation();
    validation.field = textField;

    validation.valid = typeof textField.value() != "undefined";
    if(!validation.valid){
        validation.errorMessages.push("Field value is undefined");
    }

    return validation;
};
Picasso.load("form.field.PicassoField");

/**
 * The default field implementation
 * @constructor
 */
Picasso.form.field.PicassoField = function (label, type, required, formIgnore) {
    /**
     * Sequence manager
     * @type {Picasso.core.Sequence}
     */
    var Sequence = Picasso.load("core.Sequence");

    /**
     * The html utils
     * @type {utils/html}
     */
    var htmlUtils = Picasso.load("utils.html");

    /**
     * The id of the field
     * @type {string|number}
     * @protected
     */
    this._id = null;

    /**
     * The html of the field
     * @type {HTMLElement}
     * @protected
     */
    this._element = null;

    /**
     * The field label
     * @type {string}
     * @protected
     */
    this._label = "";

    /**
     * If this field is ignored in
     * a form final value
     * @type {boolean}
     * @protected
     */
    this._formIgnore = false;

    /**
     * The flag to mark this field as required
     * @type {boolean}
     * @protected
     */
    this._required = false;

    /**
     * The type of this field
     * @type {string}
     * @protected
     */
    this._type = "";

    /**
     * Calls a 'post constructor' to this object
     * @param {string} label
     * @param {string} type
     * @param {boolean} required
     * @param {boolean} formIgnore
     * @private
     */
    this.__postConstructor__ = function(label, type, required, formIgnore){
        this._label = label;
        this._type = type;
        this._required = required;
        this._formIgnore = formIgnore;
    };

    /**
     * Builds the field
     * @param {Picasso.pjo.Field} field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.build = function (field) {
        throw new Picasso.error.NotImplementedError("PicassoField", "build");
    };

    /**
     * Verifies if the field is empty or not
     * @returns {boolean}
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.isEmpty = function () {
        throw new Picasso.error.NotImplementedError("PicassoField", "isEmpty");
    };

    /**
     * Returns or sets the value of a field
     * @param {*} val
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.value = function (val) {
        throw new Picasso.error.NotImplementedError("PicassoField", "value");
    };

    /**
     * Resets the field
     * @abstract
     * @throws {Picasso.error.NotImplementedError}
     */
    this.reset = function () {
        throw new Picasso.error.NotImplementedError("PicassoField", "reset");
    };

    /**
     * Get this field id
     * @returns {string|number}
     */
    this.getId = function () {
        return this._id;
    };

    /**
     * Get the field label
     * @return {string}
     */
    this.getLabel = function(){
        return this._label;
    };

    /**
     * Verify if the field is required
     * @return {boolean}
     */
    this.isRequired = function(){
        return this._required;
    };

    /**
     * Verify if the field is ignored in the form
     * @return {boolean}
     */
    this.isFormIgnored = function(){
        return this._formIgnore;
    };

    /**
     * Get the field type
     * @return {string}
     */
    this.getType = function(){
        return this._type;
    };

    /**
     * Sets this field id, if not is given
     * generates the id based on a sequence
     * @param {string|number} id
     */
    this.setId = function (id) {
        if (id == null || id == "") {
            var entity = this.type || "PicassoField";
            this._id = new Sequence(entity).nextVal();
        }
        else {
            if (this._element != null) {
                this._element.setAttribute("id", String(id));
            }

            this._id = id;
        }
    };

    /**
     * Add one or more classes (separated by space) to the field
     * @param {string} classes
     */
    this.addClass = function (classes) {
        htmlUtils.addClass(this._element, classes);
    };

    /**
     * Removes one or more classes (separated by space) to the field
     * @param {string} classes
     */
    this.removeClass = function (classes) {
        htmlUtils.removeClass(this._element, classes);
    };

    /**
     * Get the HTMLElement of this field
     * @return {HTMLElement}
     */
    this.getHTMLElement = function () {
        return this._element;
    };

    /**
     * Sets the HTMLElement of this field
     * @param {HTMLElement} element
     */
    this.setHTMLElement = function (element) {
        if (element instanceof HTMLElement) {
            this._element = element;
        }
    };

};
Picasso.load("form.field.ButtonField");

/**
 * Default buttons constructor
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.ButtonField = function () {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    /**
     * Verify if the button is empty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return false;
    };

    /**
     * Gets the value of the button
     * @returns {*}
     */
    this.value = function () {
        return this._element.value;
    };

    /**
     * Builds the button field
     * @param {Picasso.pjo.Field} field
     */
    this.build = function (field) {
        this.setId(field.id);

        var buttomElement = document.createElement("button");
        htmlUtils.setAttributes(buttomElement, {
            id: this.getId(),
            type: field.type || "button",
            class: "btn btn-default"
        });

        htmlUtils.setAttributes(buttomElement, field.attrs);
        buttomElement.innerHTML = field.value;
        this.formIgnore = true;

        this.setHTMLElement(buttomElement);
    };
};

Picasso.form.field.ButtonField.prototype = new Picasso.form.field.PicassoField();
Picasso.load("form.field.HiddenField");

/**
 * The default hidden input builder
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.HiddenField = function () {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");


    /**
     * Verify if the input is empty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return this.value() == "";
    };

    /**
     * Gets/Sets the value of t he input
     * @param {*} val
     * @returns {*}
     */
    this.value = function (val) {
        var el = this._element;
        if (typeof val != "undefined") {
            el.value = val;
        }
        else {
            var res = el.value;
            return res == ""? null : res;
        }
    };

    /**
     * The HTMLElement builder
     * @param {Picasso.pjo.Field} field
     * @return {HTMLElement}
     */
    this.build = function (field) {

        var fieldElement = document.createElement("input");
        htmlUtils.setAttributes(fieldElement, {
            name: field.id || "",
            type: "hidden"
        });

        htmlUtils.setAttributes(fieldElement, field.attrs);
        this.setHTMLElement(fieldElement);
    };
};

Picasso.form.field.HiddenField.prototype = new Picasso.form.field.PicassoField();
Picasso.load("form.field.InputField");

/**
 * The default 'input' builder
 * @constructor
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.form.field.InputField = function () {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");


    /**
     * Verify if the input is empty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return this.value() == "";
    };

    /**
     * Gets/Sets the value of the input
     * @param {*} val
     * @returns {*}
     */
    this.value = function (val) {
        var el = this._element.getElementsByTagName("input")[0];
        if (typeof val != "undefined") {
            el.value = val;
        }
        else {
            return el.value;
        }
    };

    /**
     * The HTMLElement builder
     * @param {Picasso.pjo.Field} field
     * @return {HTMLElement}
     */
    this.build = function (field) {

        var formGroup = document.createElement("div");
        formGroup.setAttribute("class", "form-group");

        var fieldElement = document.createElement("input");
        htmlUtils.setAttributes(fieldElement, {
            name: field.id || "",
            type: field.type || "text"
        });

        htmlUtils.setAttributes(fieldElement, field.attrs);
        htmlUtils.addClass(fieldElement, "form-control");

        var labelElement = document.createElement("label");
        labelElement.setAttribute("class", "control-label");
        labelElement.innerHTML = field.label;

        formGroup.appendChild(labelElement);
        formGroup.appendChild(fieldElement);

        this.setHTMLElement(formGroup);
    };
};

Picasso.form.field.InputField.prototype = new Picasso.form.field.PicassoField();
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

    /** @type {utils/object} */
    this.objUtils = Picasso.load("utils.object");

    /**@type {Picasso.form.FieldFactory} */
    this.fieldFactory = new Picasso.form.FieldFactory();
};

/**
 * Translates a columns object into a set of HTML elements
 * @param {Picasso.pjo.Column} col
 * @param {Picasso.form.PicassoForm} pForm
 * @returns {HTMLDivElement}
 */
Picasso.form.Builder.prototype.buildColumn = function (col, pForm) {
    col = this.objUtils.deserialize(col, Picasso.pjo.Column);

    var column = document.createElement("div");
    this.htmlUtils.setAttributes(column, col.attrs);
    column.setAttribute("id", col.id);

    var colSizeClass = "col-xs-";
    colSizeClass += col.colXSize || Picasso.pjo.Column.colSize.MEDIUM;

    this.htmlUtils.addClass(column, "column " + colSizeClass);

    var that = this;
    this.arrayUtils.each(col.fields, function (field) {
        var picassoField = that.fieldFactory.create(field);
        pForm.addField(picassoField);

        column.appendChild(picassoField.getHTMLElement());
    });

    return column;
};

/**
 * Translates a serialized grid into a HTML div
 * @param {Picasso.pjo.Grid} grid
 * @param {Picasso.form.PicassoForm} pForm
 */
Picasso.form.Builder.prototype.buildGrid = function (grid, pForm) {
    grid = this.objUtils.deserialize(grid, Picasso.pjo.Grid);

    var that = this;
    var divElement = document.createElement("div");

    if (grid.legend != null || grid.legend != "") {
        var legend = document.createElement("p");
        legend.innerHTML = grid.legend;
        this.htmlUtils.addClass(legend, "bg-info");
        divElement.appendChild(legend);
    }

    this.htmlUtils.setAttributes(divElement, grid.attrs);
    divElement.setAttribute('id', grid.id);
    this.htmlUtils.addClass(divElement, "grid-block");

    this.arrayUtils.each(grid.columns, function (fieldSet) {
        divElement.appendChild(that.buildColumn(fieldSet, pForm));
    });

    return divElement;
};

/**
 * Translates a serialized form to a HTML form
 * @param {Picasso.pjo.Form} form
 * @returns {Picasso.form.PicassoForm}
 */
Picasso.form.Builder.prototype.buildForm = function (form) {
    form = this.objUtils.deserialize(form, Picasso.pjo.Form);
    var pForm = new Picasso.form.PicassoForm();

    var formElement = document.createElement("form");
    formElement.setAttribute("id", form.id);
    formElement.setAttribute("role", "form");
    formElement.setAttribute("novalidate", "novalidate");

    this.htmlUtils.setAttributes(formElement, form.attrs);

    var that = this;
    this.arrayUtils.each(form.grid, function (block) {
        formElement.appendChild(that.buildGrid(block, pForm));
    });

    pForm.setHTMLElement(formElement);
    return pForm;
};
Picasso.load("form.FieldFactory");

/**
 * A field factory
 * @constructor
 */
Picasso.form.FieldFactory = function () {};

/**
 * All the available field constructors
 * Can be a method name or the function itself
 * @type {Object<string, string|Picasso.form.field.PicassoField.constructor>}
 * @static
 */
Picasso.form.FieldFactory.constructors = (function(){
    return {
        hidden: Picasso.form.field.HiddenField,
        text: Picasso.form.field.InputField,
        textArea: Picasso.form.field.InputField,
        email: Picasso.form.field.InputField,
        password: Picasso.form.field.InputField,

        submit: Picasso.form.field.ButtonField,
        cancel: Picasso.form.field.ButtonField,
        button: Picasso.form.field.ButtonField
    }
})();

/**
 * Sets some picasso attributes to the html field element
 * @param {Picasso.form.field.PicassoField} pField
 * @private
 */
Picasso.form.FieldFactory.prototype._setPicassoAttributes = function (pField) {
    /** @type {utils/html} */
    var htmlUtils = Picasso.load("utils.html");

    if (pField.required) {
        htmlUtils.addClass(pField.getHTMLElement(), "prequired");
    }

    if (pField.formIgnore) {
        htmlUtils.addClass(pField.getHTMLElement(), "pform-ignore");
    }
};

/**
 * Strategy pattern to choose the right
 * field builder method
 * @param {string} fieldType
 * @returns {Picasso.form.field.PicassoField.constructor}
 * @throws {Picasso.error.InvalidFieldType}
 * @private
 */
Picasso.form.FieldFactory.prototype._getFieldConstructorByFieldType = function (fieldType) {
    var constructors = this.constructor.constructors;
    if (constructors.hasOwnProperty(fieldType)) {
        var fieldConstructor = constructors[fieldType];
        if (typeof fieldConstructor === 'string') {
            return this[fieldConstructor];
        }
        else {
            return fieldConstructor;
        }
    }

    throw new Picasso.error.InvalidFieldType(fieldType);
};

/**
 * Builds a field element
 * @param {Picasso.pjo.Field} field
 * @returns {Picasso.form.field.PicassoField} The picasso field object
 */
Picasso.form.FieldFactory.prototype.create = function (field) {
    var objUtils = Picasso.load("utils.object");
    field = objUtils.deserialize(field, Picasso.pjo.Field);

    var FieldConstructor = this._getFieldConstructorByFieldType(field.type);
    var picassoField = new FieldConstructor();
    picassoField.__postConstructor__(field.label, field.type, field.required, field.formIgnore);
    picassoField.build(field);

    if (field.hasOwnProperty("id")) {
        picassoField.setId(field.id);
    }

    if(field.value != null){
        picassoField.value(field.value);
    }

    this._setPicassoAttributes(picassoField);
    return picassoField;
};
Picasso.load("form.PicassoForm");

/**
 * The Picasso representation of a form
 * @constructor
 */
Picasso.form.PicassoForm = function () {

    /**
     * The form fields
     * @type {Object<string, Picasso.form.field.PicassoField>}
     * @private
     */
    var fields = {};

    /**
     * The HTML representation of this object
     * @type {HTMLFormElement}
     * @private
     */
    var element = null;

    /**
     * Adds a field to the form
     * @param {Picasso.form.field.PicassoField} pField
     */
    this.addField = function (pField) {
        fields[pField.getId()] = pField;
    };

    /**
     * Gets the form fields
     * @returns {Picasso.form.field.PicassoField[]}
     */
    this.getFields = function () {
        var res = [];
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                res.push(fields[i]);
            }
        }
        return res;
    };

    /**
     * Gets a field by the Id
     * @param {string} fieldId
     * @return {Picasso.form.field.PicassoField}
     */
    this.getField = function (fieldId) {
        if (fields.hasOwnProperty(fieldId)) {
            return fields[fieldId];
        }
        return null;
    };

    /**
     * Sets the html element
     * @param {HTMLFormElement} htmlForm
     */
    this.setHTMLElement = function (htmlForm) {
        element = htmlForm;
    };

    /**
     * Gets the html element
     * @returns {HTMLFormElement}
     */
    this.getHTMLElement = function () {
        return element;
    };

    /**
     * Gets/Sets the form value
     * @param {Object<string, *>} data
     * returns {Object}
     */
    this.value = function (data) {
        var fields = this.getFields();
        if (typeof data == "undefined") {
            var val = {};

            for (var i = 0; i < fields.length; i++) {
                var id = fields[i].getId();
                if (typeof id != "undefined" && !fields[i].formIgnore) {
                    val[id] = fields[i].value();
                }
            }

            return val;
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this.getField(key).value(data[key]);
                }
            }
        }
    };
};

/**
 * A alias to the Picasso Form object constructor
 * @alias {Picasso.form.PicassoForm}
 */
Picasso.Form = Picasso.form.PicassoForm;

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
Picasso.load("form.Validator");

/**
 * Validates fields
 * @param {Picasso.form.Form} _form
 * @constructor
 */
Picasso.form.Validator = function (_form) {

    var log = Picasso.load("utils.log");
    var form = _form;

    /**
     * Validates a field
     * @param {Picasso.form.field.PicassoField} pField
     * @returns {Picasso.pjo.Validation}
     */
    this.validate = function (pField) {
        var validation = new Picasso.pjo.Validation();
        validation.field = pField;
        validation.valid = false;

        if (!pField.isRequired() || !pField.isEmpty()) {
            if (Picasso.form.validators.hasOwnProperty(pField.getType())) {
                return Picasso.form.validators[pField.getType()](pField);
            }
            else {
                log.warn("No validator found to the field type " + pField.getType(), pField);
                validation.valid = null;
                return validation;
            }
        }

        validation.errorMessages.push("Field is required");
        return validation;
    };

    /**
     * Validates a entire form, returning the id
     * and the validation value
     * @param {Picasso.form.PicassoForm} pForm
     * @returns {{string: boolean}}
     */
    this.validateForm = function (pForm) {
        var fields = pForm.getFields();
        var validation = {};
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i];
            if(!f.isFormIgnored()){
                validation[f.getId()] = this.validate(f);
            }
        }

        return validation;
    };
};