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
