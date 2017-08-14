'use strict';

/**
 * @ngdoc directive
 * @name shop.module.directive:itemTemplate
 * @description
 * Widget to render the product template for product lists.
 * @example
 <pre>
 <item-template item="item" mode="3" on-item-click="clicked()"></item-template>
 </pre>
 */
angular.module('shop.module').directive('locationItemTemplate', function ($ionicLoading) {
    return {
        restrict: 'E',
        scope: {
            location: '=location',
            clickHandler: '&onItemClick'
        },
        controller: ['$scope', '$state', '$ionicPopup', '$ionicLoading', '$ionicTabsDelegate', 'locale', 'ShopService', '$localStorage', '$ionicHistory', '$timeout', function ($scope, $state, $ionicPopup, $ionicLoading, $ionicTabsDelegate, locale, ShopService, $localStorage, $ionicHistory, $timeout) {
            $scope.submitLocation = function (location) {''
                ShopService.SubmitLocation(location).then(function (data) {
                    if (data[0].status) {
                        showLocationPopup(data);
                        $localStorage.location = data[0];
                    }
                });

            };
            var showLocationPopup = function (data) {
                var title = locale.getString('modals.location_modal') + ' ' + data[0].service_area_name;
                console.log(title);
                $ionicPopup.alert({
                    title: title,
                    templateUrl: 'app/shop/templates/popups/location-modal.html',
                    buttons: [{
                        text: locale.getString('modals.button_start_shopping'),
                        type: 'button-positive',
                        onTap: function (e) {
                            goToTab();
                        }
                    }, {
                        text: locale.getString('modals.button_research_location'),
                        type: 'button-balanced',
                        onTap: function (e) {

                        }
                    }]
                });
            };

            var goToTab = function(){
				$ionicHistory.clearCache();
				$timeout(function(){
					$state.go('app.menu.shop.home', {}, {reload:true});
				}, 100);
            }

        }],

        templateUrl: 'app/shop/widgets/location-view/location-item-template.html'
    };
});