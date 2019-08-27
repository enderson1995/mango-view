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
                menuText: 'Monitor Building',
                menuIcon: 'accessibility_new',
                abstract: true,
                menuHidden: false,
                weight: 996,
            },
            {
                name: 'ui.helloWorld.a',
                url: '/home',
                template: '<hello-world></hello-world>',
                menuIcon: 'fa-home',
                menuText: 'Overview',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.helloWorld.Building',
                url: '/home',
                template: '<hello-world></hello-world>',
                menuIcon: 'fa-home',
                menuText: 'Building',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.helloWorld.c',
                url: '/home',
                template: '<hello-world></hello-world>',
                menuIcon: 'fa-home',
                menuText: 'Apartment',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.helloWorld.Events',
                url: '/home',
                template: '<hello-world></hello-world>',
                menuIcon: 'fa-home',
                menuText: 'Events',
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