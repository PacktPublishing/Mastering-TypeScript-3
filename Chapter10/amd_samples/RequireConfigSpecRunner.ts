// typings install dt~require --save --global

require.config({
    baseUrl: ".",
    paths: {
        'jasmine':
            './node_modules/jasmine-core/lib/jasmine-core/jasmine',
        // 'jasmine-jquery' : 
        //     './bower_components/jasmine-jquery/lib/jasmine-jquery',
        'jasmine-html':
            './node_modules/jasmine-core/lib/jasmine-core/jasmine-html',
        'jasmine-boot':
            './node_modules/jasmine-core/lib/jasmine-core/boot'
    },
    shim: {
        'jasmine': {
            exports: 'window.jasmineRequire'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'window.jasmineRequire'
        },
        'jasmine-boot': {
            deps: ['jasmine-html'],
            exports: 'window.jasmineRequire'
        }
    }
});

var specs = [
    'test/SimpleTest'
];

require(['jasmine-boot'], (jasmineBoot: any) => {
    require(specs, () => {
        (<any>window).onload();
    });
});