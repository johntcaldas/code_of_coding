module.exports = function(grunt) {
    grunt.initConfig({
        dirs: {
          handlebars_src: 'handlebars/*.handlebars',
          handlebars_dest: '../js/handlebars_templates.js'
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
        }
    });

    grunt.registerTask('default', 'handlebars');

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');

};