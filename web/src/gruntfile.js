module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        dirs: {
          handlebars_src: 'handlebars/**/*.handlebars',
          handlebars_dest: '../js/handlebars_templates.js',
          js: '../js/**/*.js'
        },
        watch: {
          handlebars: {
            files: ['<%= handlebars.compile.src %>'],
            tasks: ['handlebars:compile']
          }
        },
        handlebars: {
          compile: {
              options: {
                 namespace:  'templates'
              },
            src: '<%= dirs.handlebars_src %>',
            dest: '<%= dirs.handlebars_dest %>'
          }
        },
        jshint : {
            files : '<%= dirs.js %>',
            options : {
                jshintrc: '.jshintrc',
                globals : {
                    jQuery : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['handlebars', 'jshint']);
};