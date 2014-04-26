/**
 * The sequences utils
 * @module utils/sequence
 */

Picasso.module("Picasso.utils.sequence");
Picasso.utils.sequence = (function () {

    /**
     * Stores all the sequences
     * @type {Object<String, number>}
     * @private
     */
    var _registeredEntities = {};


    /**
     * Validates and if necessary starts a new sequence
     * based on the given entity name
     * @param {String} entity The entity name
     * @return {boolean}
     * @private
     */
    var _validateAndStartSequence = function(entity){
        if(typeof entity == "undefined" || typeof entity != "string"){
            return false;
        }

        if(!_registeredEntities.hasOwnProperty(entity)){
            _registeredEntities[entity] = 0;
        }

        return true;
    };

    /**
     * View the sequence current value of the given
     * entity name
     * @param {String} entity The entity name
     * @return {?number} The current sequence value or null
     * to a invalid entity name
     */
    var currentVal = function(entity){
        if(_validateAndStartSequence(entity)){
            return _registeredEntities[entity];
        }

        return null;
    };

    /**
     * Get the next val of a sequence from a entity
     * and increments it
     * @param {String} entity The entity name
     * @return {number} The current sequence value
     */
    var nextVal = function(entity){
        if(_validateAndStartSequence(entity)){
            return _registeredEntities[entity]++;
        }

        return null;
    };

    // Public API
    return {
        currentVal: currentVal,
        nextVal: nextVal
    }

}());
