Picasso.load("pjo.Listener");

/**
 * Default listener
 * @param {String} eventName
 * @param {Function} callback
 * @param {Object} context
 * @constructor
 */
Picasso.pjo.Listener = function(eventName, callback, context){
    /** @type String */
    this.eventName = eventName || "";

    /** @type Function */
    this.callback = callback || new Function();

    /** @type Object */
    this.context = context || null;
};