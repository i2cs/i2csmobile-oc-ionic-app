'use strict';

/**
* @ngdoc directive
* @name shop.module.directive:itemSearch
* @description
* Widget to render product search page. 
* @example
<pre>
    <item-search></item-search>
</pre>
*/
angular.module('shop.module')
   .directive('locationSearch', function ($ionicLoading) {
       return {
           scope: {},
           link: function (scope, element, attrs) {
           },

           controller: ['$scope', '$ionicScrollDelegate', 'ShopService', '$localStorage', function ($scope, $ionicScrollDelegate, ShopService, $localStorage) {
               $scope.endOfItems = true;
               $scope.loadingItems = false;
               $scope.noSearchword = true;
               $scope.page = 1;
               $scope.search = {};

               $scope.searchLocations = function () {
                   if ($scope.loadingItems) {
                       return;
                   }

                   $scope.loadingItems = true;
                   $scope.locations = $scope.locations || [];

                   if ($scope.search && $scope.search.value == "") {
                       $scope.loadingItems = false;
                       $scope.noSearchword = true;
                       $scope.locations = [];
                       $ionicScrollDelegate.resize();
                       $scope.$broadcast('scroll.infiniteScrollComplete');
                   } else {
                       $scope.noSearchword = false;
                       ShopService.SearchLocations($scope.search.value, $scope.page).then(function (data) {
                           $scope.text_empty = data.text_empty;
                           $scope.locations = data;
                           $ionicScrollDelegate.resize();
                           $scope.endOfItems = true;
                           $scope.loadingItems = false;
                           $scope.$broadcast('scroll.infiniteScrollComplete');
                       }, function (data) {
                           $scope.loadingItems = false;
                           $scope.$broadcast('scroll.infiniteScrollComplete');
                       });
                   }
               };

               $scope.loadNextPage = function () {
                   if (!$scope.endOfItems) {
                       $scope.searchLocations();
                   } else {
                       $scope.$broadcast('scroll.infiniteScrollComplete');
                   }
               };

               $scope.onSearchKeyDown = function () {
                   $scope.endOfItems = false;
                   $scope.loadingItems = false;
                   $scope.locations = [];
                   $scope.page = 1;
                   $scope.searchLocations();
               }

           }],
           templateUrl: 'app/shop/widgets/location-search/location-template.html'
       };
   });