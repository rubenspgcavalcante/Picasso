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
