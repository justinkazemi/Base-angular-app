module.exports = function(grunt) {

  // Load only the needed plugins for the task being run. This replaces the need
  // to call grunt.loadNpmTasks('task-name') for each task.
  require('jit-grunt')(grunt, {
    ngtemplates: 'grunt-angular-templates',
    uglify: 'grunt-contrib-uglify',
  });

  /* =====================================================
   * Project Configuration
   * ================================================== */

  grunt.initConfig({

    // Pull in package.json.
    pkg: grunt.file.readJSON('package.json'),

    // Locations of our asset source and compiled folders.
    assets: {
      bower: 'bower_components',
      dist: 'dist',
      src: {
        js: 'app/js',
      }
    },

    // JavaScript linter.
    jshint: {
      gruntfile: {
        options: {
          node: true
        },
        src: 'Gruntfile.js'
      }
    },

    concat: {
      js: {
        src: [
          '<%= assets.bower %>/angular/angular.min.js',
          '<%= assets.bower %>/angular-ui-router/release/angular-ui-router.min.js',
          '<%= assets.bower %>/ui-router-extras/release/ct-ui-router-extras.min.js',
          '<%= assets.bower %>/ngprogress-lite/ngprogress-lite.min.js',

          // Load any root module files named "app.js" first. This ensures all of
          // our modules are defined before they are used by any child files.
          '<%= assets.src.js %>/**/app.js',
          '<%= assets.src.js %>/**/module.js',
          '<%= assets.src.js %>/**/*.js',
        ],
        dest: '<%= assets.dist %>/app.js',
        nocase: true
      }
    },

    ngtemplates: {
      "Domain.Assets": {
        src: '<%= assets.src.js %>/**/*.tmpl.html',
        dest: 'app/js/Domain/Assets/cacheTemplates.js',
        options: {
          htmlmin: { collapseWhitespace: true },
          url: function(url) {
            return '/dist/templates/' + url.split('/').pop();
          }
        }
      }
    },

    // Run tasks when files are changed.
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: 'build'
      },
      js: {
        files: '<%= assets.src.js %>/**/*.js',
        tasks: 'angular'
      },
      watchTemplates: {
        files: '<%= assets.src.js %>/**/*.tmpl.html',
        tasks: 'angular'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '<%= assets.dist %>/application.js': ['<%= assets.dist %>/app.js']
        }
      }
    }

  }); // end grunt.initConfig()

  /* =====================================================
   * Tasks
   *
   * Called from the command line via "grunt [task]",
   * e.g. "grunt build".
   * ================================================== */

  // Default can be run by calling `grunt` in this directory, which will first
  // build our static assets once, then call the `watch` task defined above.
  grunt.registerTask('default', ['build', 'watch']);

  // Build our static assets once without needing to call `watch`.
  // grunt.registerTask('build', ['build-styles', 'angular', 'copy']);
  grunt.registerTask('build', ['angular']);

  // Build Angular JS files.
  grunt.registerTask('angular', ['templates', 'concat:js']);

  grunt.registerTask('templates', ['ngtemplates']);

  grunt.registerTask('ugly', ['uglify']);

};
