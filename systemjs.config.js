/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
    	module: {
    		  loaders: [
    		    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    		  ]
    		},
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'jsts': 'npm:jsts',
            // ag libraries
            'ag-grid-angular': 'npm:ag-grid-angular',
            'ag-grid': 'npm:ag-grid',
            'ag-grid-enterprise': 'npm:ag-grid-enterprise',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            jsts: {
                defaultExtension: 'js'
            },
            'ag-grid-angular': {
                main: 'main.js'
            },
            'ag-grid': {
                main: 'main.js'
            },
           }
    });
})(this);
