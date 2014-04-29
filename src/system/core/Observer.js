Picasso.load("core.Observer");

/**
 * The observer constructor
 * @constructor
 */
Picasso.core.Observer = function(){

    /**
     * All the event listeners are stored here
     * @type {Object<String, Picasso.pjo.Listener[]>}
     */
    var listeners = {};

    var _visit = function(action, eventType, arg, context){
        var evListeners = listeners[eventType] || [];


    };


    this.listen = function(eventType, callback, context){
        if(typeof  eventType == "undefined"){
            throw new Picasso.error.InvalidParameters("listen", {eventType: "obrigatory"}, this.listen);
        }

        if(listeners.hasOwnProperty(eventType)){
            listeners[eventType] = [];
        }

        listeners[eventType].push()
    }
};
