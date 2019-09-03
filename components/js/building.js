define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope', 'maDataPointTags', '$state', '$stateParams', 'maPoint'];
    function HelloWorldController($scope, maDataPointTags, $state, $stateParams, maPoint) {
        this.$onInit = () => {
            this.helloWorld = 'Hola Mango';
            this.refreshSites ();
        };
        this.refreshSites = () => {
            return maDataPointTags
            .buildQuery('Building')
            .query()
            .then(values => {
                this.building = values.sort();
                this.building.unshift('ALL');
                this.building.unshift('Nuevo');
                this.helloWorld = 'cambio';
                console.log(this.building)
            })
        };
    }
    return {
        bindings: {},
        controller: HelloWorldController,
        templateUrl: require.toUrl('../html/building.html')
    };
        
});