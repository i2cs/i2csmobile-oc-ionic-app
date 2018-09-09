'use strict';

/**
 * @ngdoc directive
 * @name shop.module.directive:categoryList
 * @description
 * Widget to render category list.
 * @param {string} mode Template to render. Available options are `simple` or `collapse`. Default is `simple`
 * @param {boolean} thumbnail Whether to show category image as a thumbnail or not. Default is `false`
 * @example
 <pre>
 <category-list mode="simple|collapse|icons|vertical" thumbnail="true|false" category="1"></category-list>
 </pre>
 */
angular.module('shop.module')
    .directive('categoryList', function ($ionicLoading) {
        return {
            scope: {
                thumbnail: "@thumbnail",
                category: "=category"
            },
            link: function (scope, element, attrs) {
                scope.loadCategories();

                angular.element(element).addClass('product-categories');
            },
            controller: ['$scope', 'ShopService', function ($scope, ShopService) {
                $scope.categories = [];
                $scope.modifiedCategories = [];
                $scope.loadCategories = function () {
                    $ionicLoading.show();
                    ShopService.GetCategories($scope.category).then(function (data) {
                        $scope.categories = data.categories;

                        for (var i = 0; i < data.categories.length; i++) {
                            var subCategory = data.categories[i ];
                            console.log('###################################');

                            console.log(subCategory.category_id);
                            ShopService.GetCategories(subCategory.category_id).then(function (data) {
                                console.log('*************************************************');
                                console.log(data.categories);
                                console.log('*************************************************');
                            })


                        }
                        modifyCategories();

                        function modifyCategories() {
                            for (var i = 0; i < $scope.categories.length; i = i + 2) {
                                var rightCategory = $scope.categories[i];
                                var leftCategory = $scope.categories[i + 1];
                                var modifiedCategory = {};
                                modifiedCategory.rightCategory = rightCategory;
                                modifiedCategory.leftCategory = leftCategory;
                                $scope.modifiedCategories[i / 2] = modifiedCategory;
                            }
                        }

                        $ionicLoading.hide();
                    }, function (data) {
                        $ionicLoading.hide();
                    });
                };

                $scope.toggleGroup = function (group) {
                    if (group.categories && group.categories.length > 0)
                        group.visible = !group.visible;
                };

            }],
            templateUrl: function ($element, $attrs) {
                var tplUrl = 'app/shop/widgets/categories/simple-template.html';
                if ($attrs.mode) {
                    tplUrl = 'app/shop/widgets/categories/' + $attrs.mode + '-template.html';
                }

                return tplUrl;
            }
        };
    });
