Picasso.load("pjo.Event");

/**
 * The default event object
 * @param {String} name
 * @param {*} data
 * @param {Object} target
 * @constructor
 */
Picasso.pjo.Event = function PicassoEvent(name, data, target) {
    this.name = name || "any";
    this.data = data || null;
    this.target = target || null;
};