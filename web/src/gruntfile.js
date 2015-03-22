module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            handlebars_src: 'handlebars/**/*.handlebars',
            handlebars_dest: '../js/handlebars_templates.js',
            js: '../js/**/*.js',
            sync_src: ['../index.html', '../js/**', '../css/**', '../lib/**'],
            sync_dest: '/var/www/coc_web/*'
        },

        // Set up watches to automatically run tasks when there are filesystem changes.
        watch: {
            // Watch the handlebars source directories, and recompile the templates when they change.
            handlebars: {
                files: ['<%= handlebars.compile.src %>'],
                tasks: ['handlebars:compile', 'sync']
            },
            // Watch all the files and directories needed to run the site (sync_src) and then they change, sync to
            // sync_dest. This is useful for maintaining a running dev/debug site if you have a reason for that to
            // differ from the working copy.
            sync: {
                files: '<%= dirs.sync_src %>',
                tasks: ['sync']
            }
        },

        // This task compiles handlebars templates in handlebars_src, and drops the pre-compiled templates into a js
        // file at handlebars_dest.
        handlebars: {
            compile: {
                options: {
                    namespace: 'templates'
                },
                src: '<%= dirs.handlebars_src %>',
                dest: '<%= dirs.handlebars_dest %>'
            }
        },

        // This task does a 1-way file sync (a la rsync) from sync_src to sync_dest.
        sync: {
            main: {
                files: [{
                    cwd: '.',
                    src: '<%= dirs.sync_src %>',
                    dest: '<%= dirs.sync_dest %>'
                }],
                pretend: false,
                verbose: true
            }
        },

        // This task runs jshint.
        jshint: {
            files: '<%= dirs.js %>',
            options: {
                jshintrc: '.jshintrc',
                globals: {
                    jQuery: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sync');

    grunt.registerTask('default', ['handlebars', 'sync' /*, 'jshint' */]);
};