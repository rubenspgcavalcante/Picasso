/**
 * Main namespace
 * @namespace
 */
var Picasso = Picasso || {};

// -- Namespace virtual comments -- //

/**
 * Declares the plain javascript object constructors
 * @load {Object} Picasso.pjo
 */

/**
 * All the system core objects
 * @load {Object} Picasso.core
 */

/**
 * All the system errors objects
 * @load {Object} Picasso.error
 */

/**
 * All the utils modules
 * @load {Object} Picasso.utils
 */

// -- End of load virtual comments -- //

/**
 * Shows the information about the framework
 * @type {{author: string, version: string, build: string, license: string}}
 */
Picasso.info = {
    author: "%author%",
    version: "%version%",
    build: "%buildDate%",
    license: "%license%"
};