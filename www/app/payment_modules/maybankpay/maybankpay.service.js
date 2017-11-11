(function () {
    'use strict';
    angular
        .module('maybankpay.module')
        .service('PaymentMaybankpayService', function ($http, $q, $ionicLoading, dataService, BASE_URL) {
var cordova = {};
cordova.InAppBrowser = window;
            this.OpenPaymetWindow = function (id) {
                var deferred = $q.defer();

                if (cordova && cordova.InAppBrowser) {
                    $ionicLoading.show();

                    var inappbrowser = cordova.InAppBrowser.open(BASE_URL + "?route=api2/payment_handlers/maybankpay/checkout&order_id=" + id, '_blank', 'hidden=yes');
                    inappbrowser.addEventListener('loadstop', function (e) {
                        inappbrowser.show();
                        $ionicLoading.hide();
                        try {
                            if (e.url.substring(0, BASE_URL.length) === BASE_URL) {
                                if (e.url.indexOf("checkout/success") > -1) {
                                    deferred.resolve("Success");
                                    inappbrowser.close();
                                } else if (e.url.indexOf("checkout/cart") > -1) {
                                    deferred.reject({ error: "Cart is empty" });
                                    inappbrowser.close();
                                } else if (e.url.indexOf("checkout/checkout") > -1) {
                                    deferred.reject({ error: "Payment terminated" });
                                    inappbrowser.close();
                                }
                            }
                        } catch (e) {
                            deferred.reject({ error: e.message });
                        }
                    });
                } else {
                    deferred.reject({ error: "No inAppBrowser" });
                }

                return deferred.promise;
            }

            var getParameterByName = function (name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

        })
})();