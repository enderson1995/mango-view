define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope', 'maDataPointTags', '$state', '$stateParams', 'maPoint'];
    function HelloWorldController($scope, maDataPointTags, $state, $stateParams, maPoint){

        this.$onInit = () => {
            this.helloWorld = 'Hola Mango';
            this.refreshSites ();
        };

        this.refreshSites = () => {
            //encontrar los tags asociados a los nombres de los edificios
            return maDataPointTags
                .buildQuery('building')
                .query()
                .then(values => {
                    this.building = values.sort();
                    
                    this.siteChanged();
                })
        };

        this.siteChanged = () => {
            //Recargar la pagina cuando se selecciona algun elemento
            this.buildingPoints = {};
            $stateParams.site = this.site;
            $state.go('.', $stateParams, {location: 'replace', notify: false});
            this.sites = [];

            //Establecer valor de inicio por defecto
            if(!this.site){
                this.site = this.building [0];
            }

            //Variable de control de elementos a mostrar
            this.sites.unshift(this.site);
            this.dataPoint();
        };

        //Traer los datos de mango
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
            
            //Crear variables a mostrar
            this.sites.forEach(building => {
                this.buildingPoints[building] = {
                    'powerTotal' : this.filterByNameAndBuilding(points, 'powerTotal',this.site),
                };
                
            });
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
        templateUrl: require.toUrl('../html/building.html')
    };
        
});