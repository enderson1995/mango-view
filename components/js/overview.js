define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope', 'maDataPointTags', '$state', '$stateParams', 'maPoint'];
    function HelloWorldController($scope, maDataPointTags, $state, $stateParams, maPoint){
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
                this.buildingPoints = {};

                this.dataPoint();
            })
        };

        this.dataPoint = () => {
            let queryBuilder = maPoint.buildQuery();

            return queryBuilder
            .limit(1000)
            .query()
            .then((points) => { 
                this.orderPoints(points);
               
            });
        };

        this.orderPoints = (points) => {
            console.log(points)

            this.building.forEach(building => {
                this.buildingPoints[building] = {
                    'powerTotal' : this.filterByNameAndBuilding(points, 'powerTotal',building),
                    'energyTotal' : this.filterByNameAndBuilding(points, 'energyTotal',building),
                };
                
            });
           console.log(this.buildingPoints)
        };

        this.filterByNameAndBuilding = (points, name, building) => {
            return points.filter(point => {
                return point.name == name && point.tags.building == building;
            })[0];
        };
    }
    return {
        bindings: {},
        controller: HelloWorldController,
        templateUrl: require.toUrl('../html/overview.html')
    };
        
});