'use strict';

/**
 * @ngdoc controller
 * @name shop.module.controller:ShopHomeCtrl
 * @requires $scope
 * @requires $localStorage
 * @requires $rootScope
 * @requires $stateParams
 * @requires $ionicSlideBoxDelegate
 * @requires ShopService
 * @description
 * Home page of the Shop module. This controller contains methods to show banners and product catalog in
 * the home page.
 */
angular
    .module('shop.module')
    .controller('ShopHomeCtrl', function ($scope, $localStorage, $rootScope, $stateParams, $ionicSlideBoxDelegate, ShopService) {
        var vm = this;
        $scope.endOfRLatestItems = false;
        $scope.loadingLatest = false;
        var initialCall = true;
        $scope.activeSlide = 0;
        // sync form input to localstorage
        //$localStorage.home = /*$localStorage.home ||*/ {};
        $scope.data = {};//$localStorage.home;
        $scope.latestPage = 1;
		
		$rootScope.showCart = true;

        if (!$scope.data.slides)
            $scope.data.slides = [{image: "app/shop/images/slide.png"}];

        $scope.refreshUI = function () {
            if ($scope.loadingLatest) return;
            $scope.latestPage = 1;
            $scope.endOfRLatestItems = false;
            $scope.loadLatest(true);
            $scope.loadFeatured();
            //$scope.loadCategories();
            $scope.loadBanners();
        }

        $scope.loadBanners = function () {
            ShopService.GetBanners().then(function (data) {
                $scope.data.slides = data.main_banners;
                $scope.data.offers = data.offer_banner;
                $ionicSlideBoxDelegate.update();
            });
        }

        $scope.loadFeatured = function () {
            ShopService.GetFeaturedProducts().then(function (data) {
                $scope.data.featuredItems = data.products;
                $ionicSlideBoxDelegate.update();
            });
        }

        // $scope.loadSpecial = function () {
        //     ShopService.GetSpecialProducts(1).then(function (data) {
        //         $scope.data.specialItems = data.products;
        //         $ionicSlideBoxDelegate.update();
        //     });
        // }

        $scope.loadLatest = function (refresh) {
            if ($scope.loadingLatest) {
                return;
            }

            $scope.loadingLatest = true;
            $scope.data.latestItems = $scope.data.latestItems || [];

            ShopService.GetLatestProducts($scope.latestPage).then(function (data) {
                if (refresh) {
                    $scope.data.latestItems = data.products;
                    $scope.latestPage = 1;
                } else {
                    if ($scope.latestPage === 1) {
                        $scope.data.latestItems = [];
                    }

                    if (initialCall) {
                        $scope.latestPage = 1;
                        $scope.data.latestItems = [];
                    }

                    $scope.data.latestItems = $scope.data.latestItems.concat(data.products);
                    $scope.latestPage++;

                    initialCall = false;
                }
                if (data.products && data.products.length < 1)
                    $scope.endOfRLatestItems = true;
                $scope.loadingLatest = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }, function (data) {
                $scope.loadingLatest = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.loadNextRecentPage = function () {
            if (!$scope.endOfRLatestItems) {
                $scope.loadLatest();
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }

        $scope.$on('$ionicView.enter', function () {
            $ionicSlideBoxDelegate.update();
			$rootScope.showCart = true;
			$rootScope.main_title = "GLAMOUR BEAUTY";
        });

		$scope.$on('$ionicView.leave', function () {
            $ionicSlideBoxDelegate.update();
			$rootScope.showCart = false;
        });

		
        $scope.$on('i2csmobile.shop.refresh', function () {
            $scope.refreshUI();
        });

        $scope.loadFeatured();
        $scope.loadBanners();
        $scope.loadLatest();
        // $scope.loadSpecial();
    });


/**
 * @ngdoc controller
 * @name shop.module.controller:ShopItemCtrl
 * @requires $scope
 * @requires $timeout
 * @requires $localStorage
 * @requires $rootScope
 * @requires $state
 * @requires $stateParams
 * @requires $ionicPopup
 * @requires $ionicLoading
 * @requires $ionicTabsDelegate
 * @requires $ionicSlideBoxDelegate
 * @requires locale
 * @requires ShopService
 * @requires CartService
 * @requires WEBSITE
 * @description
 * Shows details of a selected item. Renders all attributes and options in the view.
 * Contains a `Buy` button which interacts with the API and add to product cart.
 */
angular
    .module('shop.module')
    .controller('ShopItemCtrl', function ($scope, $timeout, $localStorage, $rootScope, $state, $stateParams, $ionicPopup, $ionicLoading, $ionicTabsDelegate, $ionicSlideBoxDelegate, locale, ShopService, CartService, WEBSITE, REWARDS_ENABLED) {
        var vm = this;
        $scope.shop = {};
        $scope.cart = {};
        $scope.cart.quantity = 1;
        $scope.id = $stateParams.id;
        $scope.reward = REWARDS_ENABLED;

        $scope.$on('$ionicView.enter', function () {
            $timeout(function () {
                $ionicTabsDelegate.$getByHandle('product-tabs').select(0);
            }, 0)
        });

        $localStorage.item_cache = /*$localStorage.item_cache ||*/ {};
        $scope.item_cache = $localStorage.item_cache;

        $ionicLoading.show();

        // check cache for the item. if item is available, immediately assign it
        if ($scope.item_cache.items && $scope.item_cache.items[$stateParams.id])
            $scope.item = $scope.item_cache.items[$stateParams.id];

        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                if (!$scope.item) {
                    alert(locale.getString('shop.error_not_connected_cache_failed'));
                } else {
                    alert(locale.getString('shop.error_not_connected_cache_success'));
                }

                $ionicLoading.hide();
            }
        }

        ShopService.GetProduct($stateParams.id).then(function (data) {
            $scope.item = {};

            $scope.item.name = data.heading_title;
            $scope.item.product_id = data.product_id;
            $scope.item.text_stock = data.text_stock;
            $scope.item.text_model = data.text_model;
            $scope.item.attribure_groups = data.attribute_groups;

            $scope.item.price = data.price;
            $scope.item.price_clear = data.price_clear;
            $scope.item.currency_format = data.currency_format;
            $scope.item.decimal_place = data.decimal_place;

            $scope.item.special = data.special;
            $scope.item.special_clear = data.special_clear;
            $scope.item.reward = parseInt(data.reward);

            $scope.item.description = data.description;
            $scope.item.off = data.off;
            $scope.item.mobile_special = data.mobile_special;
            $scope.item.stock = data.stock;
            $scope.item.model = data.model;
            $scope.item.options = data.options;
            $scope.item.minimum = data.minimum || 1;

            $scope.item.review_status = data.review_status;
            $scope.item.review_guest = data.review_guest;
            $scope.item.reviews = data.reviews;
            $scope.item.rating = data.rating;
            $scope.item.entry_name = data.entry_name;
            $scope.item.entry_review = data.entry_review;

            $scope.item.related = data.products;

            $scope.item.images = data.images;

            $scope.item.options_prices_obj = {};
            for (var i in data.options) {
                var option_value_array = data.options[i].product_option_value;
                if (angular.isArray(option_value_array)) {
                    for (var j in option_value_array) {
                        var product_option_value = option_value_array[j];
                        // add additonal price label to option value name
                        if (product_option_value.price_clear) {
                            product_option_value.name = product_option_value.name + " (" + product_option_value.price_prefix + "" + product_option_value.price + ")";
                        }
                        // add additional prices to an object
                        $scope.item.options_prices_obj[product_option_value.product_option_value_id] = {
                            operator: product_option_value['price_prefix'],
                            price_clear: product_option_value['price_clear']
                        };

                    }
                }
            }

            if (!$scope.item_cache.items)
                $scope.item_cache.items = {};
            $scope.item_cache.items[$stateParams.id] = $scope.item;

            $ionicSlideBoxDelegate.update();
            $timeout(function () {
                $ionicLoading.hide();
            }, 500);
        });

        $scope.openRingSizeGuide = function () {

            $ionicPopup.alert({
                title: "Ring Size Guide",
                templateUrl: 'templates/popups/size_guide.html',
                scope: $scope
            });

            ShopService.GetRingSizeImage().then(function (data) {
                if (data && data.banners && data.banners[0])
                    $scope.item_cache.ringSizeUrl = data.banners[0].image;
            });
        }

        $scope.buyNow = function () {
            // add to cart and checkout
            if ($scope.shop.shopItemForm.$invalid) {
                $ionicPopup.alert({
                    title: locale.getString('shop.warning_options_missing'),
                    templateUrl: "app/shop/templates/popups/missing-props.html",
                    scope: $scope,
                    buttons: [
                        {
                            text: 'OK',
                            type: 'button-positive'
                        }
                    ]
                });
            } else {
                $ionicLoading.show();

                CartService.AddToCart($stateParams.id, $scope.cart.quantity, $scope.cart.options).then(function (data) {
                    $rootScope.cartItemCount = $rootScope.cartItemCount || 0;
                    $rootScope.cartItemCount += parseInt($scope.cart.quantity);
                    $ionicTabsDelegate.select(2);
                    $state.go('app.menu.cart.home', {}, {reload: true});
                    $ionicLoading.hide();
                }, function (error) {
                    alert("Error. Can't add to the cart");
                    $ionicLoading.hide();
                });
            }
        }

        $scope.addToCart = function () {
            if ($scope.shop.shopItemForm.$invalid) {
                $ionicPopup.alert({
                    title: 'Oops!',
                    templateUrl: "app/shop/templates/popups/missing-props.html",
                    scope: $scope,
                    buttons: [
                        {
                            text: 'OK',
                            type: 'button-positive'
                        }
                    ]
                });
            } else {

                // show alert regardless Add to cart confirmation
                var alertPopup = $ionicPopup.alert({
                    title: locale.getString('shop.added_to_cart_title'),
                    cssClass: 'desc-popup',
                    template: locale.getString('shop.added_to_cart_desc'),
                    buttons: [
                        {text: locale.getString('shop.button_shop_more')},
                        {
                            text: locale.getString('shop.button_go_to_cart'),
                            type: 'button-positive',
                            onTap: function (e) {
                                $ionicTabsDelegate.select(2);
                                $state.go('app.menu.cart.home', {}, {reload: true});
                            }
                        }
                    ]
                });

                CartService.AddToCart($stateParams.id, $scope.cart.quantity, $scope.cart.options).then(function (data) {
                    $rootScope.cartItemCount = $rootScope.cartItemCount || 0;
                    $rootScope.cartItemCount += parseInt($scope.cart.quantity);
                }, function (error) {
                    alertPopup.close();
                    alert("Error");
                });
            }
        }

        $scope.share = function () {
            var link = WEBSITE + "/index.php?route=product/product&product_id=" + $stateParams.id;
            window.plugins.socialsharing.share($scope.name, $scope.name, null, link);
        }

        $scope.range = function (min, max, step) {
            step = step || 1;
            min = min || 1;
            max = max || 10;
            min = parseInt(min);
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }

            return input;
        };

        $scope.selectableOptions = function (item) {
            return item.type === 'radio' || item.type === 'select';
        }

        $scope.multipleOptions = function (item) {
            return item.type === 'checkbox';
        }

        $scope.textOptions = function (item) {
            return item.type === 'text' || item.type === 'date' || item.type === 'time';
        }

        $scope.fileOptions = function (item) {
            return item.type === 'file';
        }

        $scope.datetimeOptions = function (item) {
            return item.type === 'datetime';
        }

        $scope.textareaOptions = function (item) {
            return item.type === 'textarea';
        }

        $scope.imageOptions = function (item) {
            return item.type === 'image';
        }

        vm.price_changed = false;
        $scope.$watch('cart.options', function (v) {
            vm.price_changed = false;
			if(!$scope.item) return;
            $scope.item.price_clear_temp = $scope.item.price_clear;
            $scope.item.special_clear_temp = $scope.item.special_clear;
            for (var i in v) {
                if (angular.isArray(v[i])) {
                    for (var j in v[i]) {
                        vm.applyAdditionalOptionPrices(v[i][j]);
                    }
                } else {
                    vm.applyAdditionalOptionPrices(v[i]);
                }
            }

            if (vm.price_changed)
                vm.applyNewPrice();
        }, true);

        vm.applyAdditionalOptionPrices = function (option_value_id) {
            var opt_value_obj = $scope.item.options_prices_obj[option_value_id];
            if (opt_value_obj) {
                if (opt_value_obj.operator == "+") {
                    if (angular.isNumber($scope.item.price_clear_temp))
                        $scope.item.price_clear_temp += opt_value_obj.price_clear;
                    if (angular.isNumber($scope.item.special_clear_temp))
                        $scope.item.special_clear_temp += opt_value_obj.price_clear;
                } else if (opt_value_obj.operator == "-") {
                    if (angular.isNumber($scope.item.price_clear_temp))
                        $scope.item.price_clear_temp -= opt_value_obj.price_clear;
                    if (angular.isNumber($scope.item.special_clear_temp))
                        $scope.item.special_clear_temp -= opt_value_obj.price_clear;
                }

                vm.price_changed = true;
            }
        }

        vm.applyNewPrice = function () {
            $scope.item.decimal_place = $scope.item.decimal_place || 2;
            if (angular.isNumber($scope.item.price_clear_temp))
                $scope.item.price = $scope.item.currency_format.replace("{value}", Number($scope.item.price_clear_temp).toFixed($scope.item.decimal_place));

            if (angular.isNumber($scope.item.special_clear_temp))
                $scope.item.special = $scope.item.currency_format.replace("{value}", Number($scope.item.special_clear_temp).toFixed($scope.item.decimal_place));
        }

        $scope.changeSlider = function (image) {
            var imagePrefixUrl = image.split('-')[0];

            for (var i = 0; i < $scope.item.images.length; i++) {
                var imgObj = $scope.item.images[i];
                console.log(imgObj);
                if (imgObj.popup.indexOf(imagePrefixUrl) != -1) {
                    $scope.activeSlide = i;
                    break;
                }
            }
        };

        $scope.getActiveSlide = function () {
            return $scope.activeSlide
        }
    });


/**
 * @ngdoc controller
 * @name shop.module.controller:ShopCategoryCtrl
 * @requires $scope
 * @requires $rootScope
 * @requires $stateParams
 * @requires $state
 * @requires ShopService
 * @description
 * Lists products of a selected category.
 */
angular
    .module('shop.module')
    .controller('ShopCategoryCtrl', function ($scope, $rootScope, $stateParams, $state, $ionicLoading, ShopService) {
        var vm = this;

        $scope.id = $stateParams.id;
		$scope.selectedCategory = 0;
		$scope.pages = {};
		$scope.endOfPages = {};

        if (!$stateParams.id) {
            $state.go('app.menu.shop.home');
        }

        $scope.endOfItems = false;
        $scope.loadingItems = false;
        $scope.page = 1;

        $scope.refreshUI = function () {
            $scope.endOfItems = false;
            $scope.items = [];
            $scope.gridItems = [];
            $scope.page = 1;
            $scope.loadItems();
        }

        $scope.loadItems = function () {
            $scope.items = $scope.items || [];
            $scope.gridItems = $scope.gridItems || [];

			ShopService.GetCategoryProducts($stateParams.id, 1).then(function (data) {
				$rootScope.main_title = data.heading_title;
			});
			
            $scope.tabbedGrid = [];
			$ionicLoading.show();
            ShopService.GetCategories($stateParams.id).then(function (data) {
				$ionicLoading.hide();
			
				if(data && data.categories && data.categories[0] && data.categories[0].category_id) {
					$scope.selectedCategory = data.categories[0].category_id;
				}
				getSubCategories(data);
				$ionicLoading.hide();
            }).then();

        };

        async function getSubCategories(data) {
            console.log(data.categories);
            for (var j = 0; j < data.categories.length; j++) {
                var subCategory = data.categories[j];
                var tabbedGirdItem = {};
                tabbedGirdItem.name = subCategory.name;
                tabbedGirdItem.id = subCategory.category_id;
                var productGrid = [];

				$scope.pages[subCategory.category_id] = 1;
				$scope.endOfPages[subCategory.category_id] = false;
                tabbedGirdItem.grid = productGrid;
                $scope.tabbedGrid.push(tabbedGirdItem);
				
				if(j == 0){
					$scope.loadSubItemsOnUI(subCategory.category_id);
				}
            }
            console.log('tabbed grid');
            console.log($scope.tabbedGrid);
        }

		$scope.loadSubItemsOnUI = function(id){
			var selected = $scope.tabbedGrid.filter(a => a.id == id)[0];
			if(selected){
				$scope.selectedCategory = selected.id;
				if(selected.grid.length == 0)
					$scope.loadNextPage();
				else
					$scope.items = selected.grid;
				console.log('Sub category selected', selected.id, $scope.items)
			}
		}
		
        $scope.loadNextPage = function () {
			if($scope.selectedCategory == 0){
				$scope.$broadcast('scroll.infiniteScrollComplete');
				return;
			}
			
			$ionicLoading.show();
			console.log('next', !$scope.endOfPages[$scope.selectedCategory], !$scope.loadingItems)
            if (!$scope.endOfPages[$scope.selectedCategory] && !$scope.loadingItems) {
                $scope.loadingItems = true;
				ShopService.GetCategoryProducts($scope.selectedCategory, $scope.pages[$scope.selectedCategory]++).then(function (data) {
					var changingItem = $scope.tabbedGrid.filter(a => a.id == $scope.selectedCategory)[0];
					if(changingItem){
						var productGrid = changingItem.grid;
						var currentLength = changingItem.grid.length % 2 == 0 ? changingItem.grid.length : changingItem.grid.length + 1;
						for (var i = 0; i < data.products.length; i = i + 2) {
							var rightItem = data.products[i];
							var leftItem = data.products[i + 1];
							var gridItem = {};
							gridItem.rightItem = rightItem;
							gridItem.leftItem = leftItem;
							productGrid.push(gridItem);
						}
						
						if (data && data.products.length < 1)
							$scope.endOfPages[$scope.selectedCategory] = true;
						
						$scope.loadSubItemsOnUI($scope.selectedCategory);
					}
					
					$ionicLoading.hide();
					$scope.loadingItems = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, function (data) {
					$ionicLoading.hide();
                    $scope.loadingItems = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
				$ionicLoading.hide();
            }
        }
		
		$scope.loadItems();
		
		$scope.$on('$ionicView.enter', function () {
			//$rootScope.main_title = "GLAMOUR BEAUTY";
        });

		$scope.$on('$ionicView.leave', function () {
            $rootScope.main_title = "GLAMOUR BEAUTY";
        });
    });


/**
 * @ngdoc controller
 * @name shop.module.controller:ShopSearchCtrl
 * @requires $scope
 * @requires $rootScope
 * @requires $ionicScrollDelegate
 * @requires $stateParams
 * @requires ShopService
 * @description
 * Search page shows a search input box and filters the product catalog for the customer entered
 * keywords.
 */
angular
    .module('shop.module')
    .controller('ShopSearchCtrl', function ($scope, $rootScope, $ionicScrollDelegate, $stateParams, ShopService) {

    });
