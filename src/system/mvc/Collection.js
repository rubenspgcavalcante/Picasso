Picasso.load("Collection");

Picasso.Collection = function (ModelConstructor) {
    var Collection = Picasso.utils.object.extend(Picasso.Collection.MetaConstructor, Array);

    var collection = new Collection();
    collection.setCollectionType(ModelConstructor);

    return collection;
};

/**
 * A model collection constructor
 * @extends {Array}
 * @constructor
 */
Picasso.Collection.MetaConstructor = function () {
    /**
     * Sets the type of the collection
     * @param {Picasso.Model} ModelConstructor
     */
    this.setCollectionType = function (ModelConstructor) {
        this.ModelConstructor = ModelConstructor;
    };

    /**
     * Clears the collection
     */
    this.clear = function () {
        for (var i = 0, l = this.length; i < l; i++) {
            this.pop();
        }
    };

    /**
     * Iterates over each element of the collection
     * @param {function} callback
     */
    this.each = function (callback) {
        for (var i = 0, l = this.length; i < l; i++) {
            callback(this[i], i);
        }
    };

    /**
     * Gets a element of the collection
     * @param {number} id
     * @returns {?Picasso.Model}
     */
    this.getElement = function (id) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === id) {
                return this[i];
            }
        }
        return null;
    };

    /**
     * Adds a element to the collection
     * @param element
     */
    this.addElement = function (element) {
        var model = new this.ModelConstructor();
        model.update(element);
        this.push(model);
    };

    /**
     * Adds elements to the collection
     * @param elements
     */
    this.addElements = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
    };

    /**
     * Removes a element from the collection
     * @param {number} id
     * @returns {Picasso.Model}
     */
    this.removeElement = function (id) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === id) {
                return this.splice(i, 1);
            }
        }
    };

    /**
     * Update a element from collection
     * @param {Picasso.Model} element
     * @param {string} [property='id']
     */
    this.updateElement = function (element, property) {
        if (!element.hasOwnProperty(property) || typeof property === 'undefined') {
            property = 'id';
        }

        for (var i = 0; i < this.length; i++) {
            if (this[i].hasOwnProperty(property) && element.hasOwnProperty(property)
                && element[property] === this[i][property]) {

                this[i].update(element);
            }
        }
    };
};