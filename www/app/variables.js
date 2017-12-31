angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'http://genan.sa')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'http://genan.sa?route=api2')
    .constant('WEBSITE', 'http://genan.sa')
    .constant('FORGOT_LINK', 'http://genan.sa?route=account/forgotten')
    .constant('EMAIL', 'info@genan.sa')
    .constant('PHONE', '0562800884')
    .constant('ANALYTICS_ID', 'UA-79548648-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#D0A36B")
    .constant('LANGUAGES', [
            { name: "Arabic", language_id: "ar-SA" }])
    .constant('WELCOME_SLIDES', [])
    .constant('RTL_LANGUAGES', ['ar'])
    .constant('INTERCOM_INTEGRATION', false) // please check www/app/common/services/intercom.service.js
    .constant('ONESIGNAL_APP_ID', "7bf9c483-9c2c-4b89-8773-69ea437e6055") // get OneSignal app id from http://onesignal.com
    .constant('GCM_SENDER_ID', "85852083796")
    .constant('MENU_LAYOUT', "tabs")

    // if demo mode is set to true, some dynamic configurations 
    // used only for demo app will appear in info section
    .constant('DEMO_MODE', false)