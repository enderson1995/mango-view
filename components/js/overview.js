define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope'];
    function HelloWorldController($scope) {
        this.$onInit = () => {
                this.helloWorld = 'Hola Mango';
                this.refreshSites ();
            };

        this.refreshSites = () => {
            return maDataPointTags
            .buildQuery('building')
            .query()
            .then(values => {
            this.building = values.sort();
        })
        };
    }
    return {
        bindings: {},
        controller: HelloWorldController,
        templateUrl: require.toUrl('../html/overview.html')
    };
        
});