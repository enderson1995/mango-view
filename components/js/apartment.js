define(['angular', 'require'], function(angular, require) {
    'use strict';
    HelloWorldController.$inject = ['$scope', 'maDataPointTags', '$state', '$stateParams', 'maPoint', 'maUiDateBar'];
    function HelloWorldController($scope, maDataPointTags, $state, $stateParams, maPoint, maUiDateBar) {

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
            $stateParams.site = this.site;
            $state.go('.', $stateParams, {location: 'replace', notify: false});
            
            if(!this.site){
                this.site = this.building [0];
            }

            this.refreshFloor();
        };

        this.refreshFloor = () =>{
            let queryBuilder = maDataPointTags.buildQuery('floor');
            queryBuilder.eq('building', this.site);

            // encontrar tags asociados a los pisos
            return queryBuilder
            .query()
            .then(values => {
                this.floors = values.sort();


                if(!this.floors.includes(this.floor)){
                    if(this.floors.includes($stateParams.floor)){
                        this.floor = $stateParams.floor;
                    }else if(this.floors.length){
                        this.floor = this.floors[0];
                    }else {
                        this.floor = null;
                    }
                    this.floorChanged();
                }
            }

            )
        };

        this.floorChanged = () => {
            $stateParams.floor = this.floor;
            $state.go('.', $stateParams, {location: 'replace', notify: false});
            
            this.refreshApartment();
        };

        this.refreshApartment = () => {
            let queryBuilder = maDataPointTags.buildQuery('apartment');
            queryBuilder.eq('floor', this.floor);

            return queryBuilder
            .query()
            .then(values => {
                this.apartments = values.sort();


                if(!this.apartments.includes(this.apartment)){
                    if(this.apartments.includes($stateParams.apartment)){
                        this.apartment = $stateParams.apartment;
                    }else if(this.apartments.length){
                        this.apartment = this.apartments[0];
                    }else {
                        this.apartment = null;
                    }
                    this.apartmentChanged();
                }else {
                    this.apartmentChanged();
                }
            }

            )
        };

        this.apartmentChanged = () => {
            this.sites = [];
            $stateParams.apartment = this.apartment;
            $state.go('.', $stateParams, {location: 'replace', notify: false});
            this.sites.unshift(this.site);

            this.dataPoint();
        };

        this.dataPoint = () => {
            let queryBuilder = maPoint.buildQuery();
            this.apartmentPoints = [];
    
            return queryBuilder
                .limit(1000)
                .eq('tags.building', this.site)
                .eq('tags.floor', this.floor)
                .eq('tags.apartment', this.apartment)
                .query()
                .then((points) => {     
                    this.orderPoints(points);   

                });
        };

        this.orderPoints = (points) => {
            console.log(points)
            //Crear variables a mostrar

            this.sites.forEach(site => {

                this.vLineToNeutralAverage = this.filterByName(points, 'vLineToNeutralAverage');
                this.powerTotal = this.filterByName(points, 'powerTotal');
                this.energyTotal = this.filterByName(points, 'energyTotal');
                this.costTotal = this.filterByName(points, 'costTotal');
                this.status = false;

                console.log(this.status)
            });
        };

        this.filterByName = (points, name) => {
            return points.filter(point => {
                return point.name == name;
            })[0];
        };
    }
    return {
        bindings: {},
        controller: HelloWorldController,
        templateUrl: require.toUrl('../html/apartment.html')
    };
        
    });
