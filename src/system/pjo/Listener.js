/**
 * The sequences utils
 * @module pjo/Listener
 */
Picasso.module("Picasso.pjo.Listener");

/**
 * Default listener
 * @param {String} eventName
 * @param {Function} callback
 * @constructor
 */
Picasso.pjo.Listener = function(eventName, callback){
    /** @type String */
    this.eventName = eventName || "";

    /** @type Function */
    this.callback = callback || new Function();
};
