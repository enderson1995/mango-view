define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope', 'maDataPointTags', '$state', '$stateParams', 'maPoint', 'maUiDateBar'];
    function HelloWorldController($scope, maDataPointTags, $state, $stateParams, maPoint, maUiDateBar){

        this.$onInit = () => {
            this.maUiDateBar = maUiDateBar;
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
                    'power1' : this.filterByNameAndBuildingAndLine(points, 'Power',this.site, '1'),
                    'power2' : this.filterByNameAndBuildingAndLine(points, 'Power',this.site, '2'),
                    'power3' : this.filterByNameAndBuildingAndLine(points, 'Power',this.site, '3'),
                    'powerTotal' : this.filterByNameAndBuilding(points, 'powerTotal',this.site),
                    'energyTotal' : this.filterByNameAndBuilding(points, 'energyTotal',this.site),
                    'costTotal' : this.filterByNameAndBuilding(points, 'costTotal',this.site),
                    'frecuency' : this.filterByNameAndBuilding(points, 'Frecuency',this.site),
                    'maximumValue' : this.filterByNameAndBuilding(points, 'maximumValue',this.site),
                    'vLineNeutral1' : this.filterByNameAndBuildingAndLine(points, 'vLineToNeutral',this.site,'1'),
                    'vLineNeutral2' : this.filterByNameAndBuildingAndLine(points, 'vLineToNeutral',this.site,'2'),
                    'vLineNeutral3' : this.filterByNameAndBuildingAndLine(points, 'vLineToNeutral',this.site,'3'),
                    'vLineNeutralAverage' : this.filterByNameAndBuildingAndLine(points, 'vLineToNeutral',this.site,'Average'),
                    'vLineLine1' : this.filterByNameAndBuildingAndLine(points, 'vLineToLine',this.site,'12'),
                    'vLineLine2' : this.filterByNameAndBuildingAndLine(points, 'vLineToLine',this.site,'23'),
                    'vLineLine3' : this.filterByNameAndBuildingAndLine(points, 'vLineToLine',this.site,'31'),
                    'vLineLineAverage' : this.filterByNameAndBuildingAndLine(points, 'vLineToLine',this.site,'Average'),
                    'current1' : this.filterByNameAndBuildingAndLine(points, 'Current',this.site,'1'),
                    'current2' : this.filterByNameAndBuildingAndLine(points, 'Current',this.site,'2'),
                    'current3' : this.filterByNameAndBuildingAndLine(points, 'Current',this.site,'3'),
                    'currentAverage' : this.filterByNameAndBuildingAndLine(points, 'Current',this.site,'Total'),
                    'fp1' : this.filterByNameAndBuildingAndLine(points, 'FP',this.site,'1'),
                    'fp2' : this.filterByNameAndBuildingAndLine(points, 'FP',this.site,'2'),
                    'fp3' : this.filterByNameAndBuildingAndLine(points, 'FP',this.site,'3'),
                    'fpAverage' : this.filterByNameAndBuildingAndLine(points, 'FP',this.site,'Average'),
                };
                
                this.energyTotal = this.filterByNameAndBuilding(points, 'energyTotal', this.site);
                this.costTotal = this.filterByNameAndBuilding(points, 'costTotal', this.site);
                this.vLineToNeutralAverage = this.filterByNameAndBuildingAndLine(points, 'vLineToNeutral',this.site,'Average');
                this.vLineToLineAverage = this.filterByNameAndBuildingAndLine(points, 'vLineToLine',this.site,'Average');
                this.currentTotal = this.filterByNameAndBuildingAndLine(points, 'Current',this.site,'Total');
                this.powerTotal = this.filterByNameAndBuilding(points, 'powerTotal',this.site);
                
            });
        };

        this.filterByNameAndBuilding = (points, name, building) => {
            return points.filter(point => {
                return point.name == name && point.tags.building == building;
            })[0];
        };

        this.filterByNameAndBuildingAndLine = (points, name, building, line) => {
            return points.filter(point => {
                return point.name == name && point.tags.building == building && point.tags.line == line; 
            })[0];
        };
    }
    return {
        bindings: {},
        controller: HelloWorldController,
        templateUrl: require.toUrl('../html/building.html')
    };
        
});