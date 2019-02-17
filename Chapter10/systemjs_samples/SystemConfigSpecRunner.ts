SystemJS.config({
    baseUrl : '.',
    packages : {
        'lib' : { defaultExtension: 'js' }
        ,'test' : { defaultExtension: 'js' }
    },
     paths: {
        'jasmine' : 
            './node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
        'jasmine-html' : 
            './node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
        'jasmine-boot' : 
            './node_modules/jasmine-core/lib/jasmine-core/boot.js'
    },
    meta : {
        'jasmine-boot' : {
            deps : ['jasmine-html']
            ,exports: 'window.jasmineRequire'
        },
        'jasmine-html' : {
            deps : ['jasmine']
            ,exports: 'window.jasmineRequire'
        },
        'jasmine' : {
            exports: 'window.jasmineRequire'
        }
    }
    
});

SystemJS.import('jasmine-boot').then( () => {
    Promise.all([
        SystemJS.import('test/SimpleTest'),
        SystemJS.import('test/SimpleTest2')
    ])
    .then(() => {
        (<any>window).onload();
    })
    .catch(console.error.bind(console));

});

