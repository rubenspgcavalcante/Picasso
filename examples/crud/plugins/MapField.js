/**
 * Set description here
 * @author rubens
 * @since 23/07/14
 * @extends {Picasso.form.field.PicassoField}
 */
Picasso.extend.field("MapField", function () {
    var that = this;

    /**
     * Local reference of the leaflet map
     * @type {L.map}
     * @private
     */
    var lMap = null;

    /**
     * Marker plotted on the clicked position
     * @type {L.Marker}
     */
    var marker = null;

    /**
     * The point clicked on the map
     * @type {lat: number, lng: number}
     */
    var position = {lat: null, lng: null};

    /**
     * Bind the map events
     * @private
     */
    var _bindLeafletEvents = function () {
        lMap.on("click", function (ev) {
            that.value(ev.latlng)
        });
    };

    this.afterRender = function () {
        lMap.invalidateSize();
    };

    /**
     * Builds the fieldarface
     * @param {Picasso.pjo.Field} field
     * @override {Picasso.form.field.PicassoField}
     */
    this.build = function (field) {
        var $map = $("<div>", {class: "map-field"});
        lMap = L.map($map[0]).setView([0, 0], 2);
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i86knfo3'
        }).addTo(lMap);

        this.setHTMLElement($map[0]);
        _bindLeafletEvents();
    };

    /**
     * Verifies if the field is empty or not
     * @returns {boolean}
     * @override {Picasso.form.field.PicassoField}
     */
    this.isEmpty = function () {
        return position == null;
    };

    /**
     * Returns or sets the value of a field
     * @param {lat: number, lng: number} pos
     * @override {Picasso.form.field.PicassoField}
     */
    this.value = function (pos) {
        if (typeof pos != "undefined") {
            if (marker != null) {
                lMap.removeLayer(marker);
            }
            marker = new L.Marker(pos);
            lMap.addLayer(marker);
            position.lat = pos.lat;
            position.lng = pos.lng;
        }
        else {
            return position
        }
    };

    /**
     * Resets the field
     * @override {Picasso.form.field.PicassoField}
     */
    this.reset = function () {
        if (marker != null) {
            lMap.removeLayer(marker);
        }
        position = {lat: null, lng: null};
    };
});