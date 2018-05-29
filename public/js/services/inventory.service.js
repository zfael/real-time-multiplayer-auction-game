(function () {
    'use strict';

    angular
        .module('app')
        .service('inventoryService', Service);

    Service.$inject = ['$http', '$interpolate', 'constantService'];
    function Service($http, $interpolate, constantService) {
        this.allInventoriesByUser = allInventoriesByUser;


        ////////////////

        function allInventoriesByUser(obj) {
            var url = $interpolate(constantService.userInventory)(obj);

            return $http
                .get(url)                
                .then(success, failure);
        }

        function success(response) {
            return response.data;
        }

        function failure(err) {
            return err.data;
        }
    }
})();