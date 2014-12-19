module.exports = function(grunt) {

  // -- Config -------------------------------------------------------------------

  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          sourcemap: 'none',
          compass: true,
          require: 'susy'
        },
        files: {                         // Dictionary of files
          'public/css/home/all.css': 'sass/home/all.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    }

  });
  // -- Main Tasks ---------------------------------------------------------------
  // grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  // Default task(s).
  grunt.registerTask('default', ['watch','sass']);

};
