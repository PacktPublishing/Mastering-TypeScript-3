SystemJS.config({
    packages : {
        'lib' : { defaultExtension: 'js' }
    }
});
SystemJS.import('app.js');