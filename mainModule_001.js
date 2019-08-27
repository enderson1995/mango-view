define([
    'angular', 
    'require',
    './components/helloWorld.js'
], 
function(angular, require, helloWorld) {
'use strict';
var mainModule = angular.module('userModule', ['maUiApp']);
    mainModule.component('helloWorld', helloWorld);
    mainModule.config(['maUiMenuProvider', function(maUiMenuProvider) {
        maUiMenuProvider.registerMenuItems([
            {
                name: 'ui.helloWorld',
                url: '/hello-world',
                menuText: 'Hello World',
                menuIcon: 'accessibility_new',
                abstract: true,
                menuHidden: false,
                weight: 996,
            },
            {
                name: 'ui.helloWorld.home',
                url: '/home',
                template: '<hello-world></hello-world>',
                menuIcon: 'fa-home',
                menuText: 'Home',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
        ]);
    }]);
    return mainModule;
});