module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    "src/defines.js",
                    "src/system/load.js",
                    "src/system/pjo/*.js",
                    "src/system/error/*.js",
                    "src/utils/*.js",
                    "src/system/core/*.js",
                    "src/system/mvc/*.js",
                ],
                dest: "dist/<%=pkg.name %>.<%= pkg.version %>.js"
            }
        },

        'string-replace': {
            dist: {
                files: {
                    "dist/": "dist/<%=pkg.name %>.<%= pkg.version %>.js"
                }
            },

            options: {
                replacements: [
                    {
                        pattern: "%version%",
                        replacement: "<%= pkg.version %>"
                    },
                    {
                        pattern: "%author%",
                        replacement: "<%= pkg.author %>"
                    },
                    {
                        pattern: "%buildDate%",
                        replacement: '<%= grunt.template.today("yyyy-mm-dd") %>'
                    },
                    {
                        pattern: "%license%",
                        replacement: "<%= pkg.license %>"
                    }
                ]
            }
        },

        uglify: {
            options: {
                banner: '/**\n' +
                    '* Picasso\n' +
                    '* A Framework to build dinamic forms using MVC\n' +
                    '* Build date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '* @author <%= pkg.author %>\n' +
                    '* @version <%= pkg.version %>\n' +
                    '* @license <%= pkg.license %>\n' +
                    '*/\n'
            },
            dist: {
                src: "dist/<%= pkg.name %>.<%= pkg.version %>.js",
                dest: "dist/<%= pkg.name %>.<%= pkg.version %>.min.js"
            }
        },

        nodeunit: {
            all: ["tests/nodeunit/*.test.js"]
        },

        jsdoc: {
            dist: {
                src: ['src/**/*.js'],
                options: {
                    destination: 'docs'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');


    // Default task(s).
    grunt.registerTask('default', ['concat', 'string-replace', 'uglify', "jsdoc"]);

    //Use it only in dev
    grunt.registerTask('refresh', ['concat', 'string-replace']);
};