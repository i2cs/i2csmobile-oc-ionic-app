'use strict';

angular.module('pp_standard.module')
    .config(function config($stateProvider) {
        $stateProvider.state('app.menu.payment_modules.pp_standard', {
            url: '/pp_standard',
               abstract: true,
               views: {
                   'paymentsContent': {
                       templateUrl: 'app/payment_modules/pp_standard/templates/layout.html'
                   }
               }
           })
           .state('app.menu.payment_modules.pp_standard.home', {
               url: '/home',
               views: {
                   'ppExpressContent': {
                       templateUrl: 'app/payment_modules/pp_standard/templates/home.html',
                       controller: 'PaymentPPStandardCtrl'
                   }
               }
           })
    });