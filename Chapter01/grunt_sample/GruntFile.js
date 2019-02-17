module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['**/*.ts'],
            tasks: ['exec:run_tsc']
        },
        exec: {
            run_tsc: { cmd: 'tsc' }
        }
    });
    grunt.registerTask('default', ['watch']);
};