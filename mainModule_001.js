define([
    'angular', 
    'require',
    './components/js/overview.js',
    './components/js/building.js',
    './components/js/apartment.js',
    './components/js/events.js'
], 
function(angular, require, overview, building, apartment,events) {
'use strict';
var mainModule = angular.module('userModule', ['maUiApp']);
    mainModule.component('overview', overview);
    mainModule.component('building', building);
    mainModule.component('apartment', apartment);
    mainModule.component('events', events);
    mainModule.config(['maUiMenuProvider', function(maUiMenuProvider) {
        maUiMenuProvider.registerMenuItems([
            {
                name: 'ui.monitorBuilding',
                url: '/monitor-building',
                menuText: 'Monitor Building',
                menuIcon: 'location_city',
                abstract: true,
                menuHidden: false,
                weight: 996,
            },
            {
                name: 'ui.monitorBuilding.aOverview',
                url: '/overview',
                template: '<overview></overview>',
                menuIcon: 'room',
                menuText: 'Overview',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.monitorBuilding.Building',
                url: '/building',
                template: '<building></building>',
                menuIcon: 'data_usage',
                menuText: 'Building',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.monitorBuilding.cAparment',
                url: '/apartment',
                template: '<apartment></apartment>',
                menuIcon: 'view_headline',
                menuText: 'Apartment',
                weight: 997,
                params: {
                    noPadding: false,
                    hideFooter: false,
                },
            },
            {
                name: 'ui.monitorBuilding.Events',
                url: '/events',
                template: '<events></events>',
                menuIcon: 'access_alarm',
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