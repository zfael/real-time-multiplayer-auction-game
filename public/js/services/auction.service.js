(function () {
    'use strict';

    angular
        .module('app')
        .service('auctionService', Service);

    Service.$inject = ['$http', 'constantService'];
    function Service($http, constantService) {
        this.newAuction = newAuction;
        this.getActiveAuction = getActiveAuction;
        this.enterNewBid = enterNewBid;

        ////////////////

        function newAuction(obj) {
            var url = constantService.newAuction;

            return $http
                .post(url, obj)
                .then(success, failure);
        }

        function getActiveAuction() {
            var url = constantService.getActiveAuction;

            return $http
                .get(url)
                .then(success, failure);
        }

        function enterNewBid(obj) {
            var url = constantService.enterNewBid;

            return $http
                .put(url, obj)
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