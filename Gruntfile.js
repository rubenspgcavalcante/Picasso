module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            dist:{
                src: [
                    "src/module.js",
                    "src/utils/*.js"
                ],
                dest: "dist/<%=pkg.name %>.<%= pkg.version %>.js"
            }
        },

        uglify: {
            options: {
                banner:
                    '/**\n' +
                    '* Picasso\n' +
                    '* A Framework to build dinamic forms using MVC\n' +
                    '* Build date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '* @author <%= pkg.author %>\n' +
                    '* @version <%= pkg.version %>\n' +
                    '* @license <%= pkg.license %>\n' +
                    '*/\n'
            },
            dist:{
                src: "dist/<%= pkg.name %>.<%= pkg.version %>.js",
                dest: "dist/<%= pkg.name %>.<%= pkg.version %>.min.js"
            }
        },

        nodeunit: {
            all: ["tests/nodeunit/*.test.js"]
        },

        jsdoc : {
            dist : {
                src: ['src/**/*.js'],
                options: {
                    destination: 'docs'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', "jsdoc"]);

    //Use it only in dev
    grunt.registerTask('refresh', ['concat']);
};