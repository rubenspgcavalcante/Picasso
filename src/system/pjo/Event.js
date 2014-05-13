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