(function () {
    'use strict';

    angular
        .module('app')
        .directive('inventory', Directive);

    Directive.$inject = ['$uibModal'];
    function Directive($uibModal) {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/inventory/inventory.html',
            scope: {
                inventories: '=',
                user: '=',
                auctionFeedback: '&'
            },
            link: function (scope, elm, attrs) {
                scope.modalAuction = modalAuction;

                function modalAuction(inventory) {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'newAuction.html',
                        controller: 'newAuctionController',
                        size: 'sm',
                        resolve: {
                            currentItem: function () {
                                return inventory;
                            },
                            currentUser: function () {
                                return scope.user;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        if (scope.auctionFeedback) {
                            scope.auctionFeedback();
                        }
                    }, function () {
                    });
                }
            }
        };

        return directive;
    }
})();