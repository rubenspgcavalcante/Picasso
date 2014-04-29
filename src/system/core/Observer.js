/**
 * The sequences utils
 * @module core/Observer
 */

Picasso.module("Picasso.core.Observer");

/**
 * The observer constructor
 * @constructor
 */
Picasso.core.Observer = function(){

    /**
     * All the event listeners are stored here
     * @type {Object<String, Function[]>}
     */
    var listeners = {};

    this.listen = function(eventType, callback, context){
        if(typeof  eventType == "undefined"){
            throw new Picasso.error.InvalidParameters("listen", this.listen);
        }


    }
};
