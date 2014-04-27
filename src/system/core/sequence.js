/**
 * The sequences utils
 * @module core/sequence
 */

Picasso.module("Picasso.core.Sequence");
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
     *
     * @param {String} entity The entity name
     * @constructor
     */
    var SeqConstructor = function (entity) {
        var _entity = entity;

        /**
         * View the sequence current value
         * @return {?number} The current sequence value or null
         * to a invalid entity name
         */
        this.currentVal = function () {
            if (_validateAndStartSequence(_entity)) {
                return _registeredEntities[_entity];
            }

            return null;
        };

        /**
         * Get the next val of a sequence and increments it
         * @return {number} The current sequence value
         */
        this.nextVal = function (entity) {
            if (_validateAndStartSequence(_entity)) {
                if (_registeredEntities[_entity] == null) {
                    _registeredEntities[_entity] = 0;
                    return 0;
                }
                return ++_registeredEntities[_entity];
            }

            return null;
        };
    };

    return SeqConstructor

}());
