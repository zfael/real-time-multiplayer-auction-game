(function () {
    'use strict';

    angular
        .module('app')
        .service('constantService', Service);

    Service.$inject = [];
    function Service() {

        var restEndPoint = 'http://localhost:5000';

        this.login = restEndPoint + '/api/user/login';
        this.userInventory = restEndPoint + '/api/inventory/user/{{id}}';
        this.newAuction = restEndPoint + '/api/auction/';
        this.getActiveAuction = restEndPoint + '/api/auction/active';
        this.enterNewBid = restEndPoint + '/api/auction/';
    }
})();