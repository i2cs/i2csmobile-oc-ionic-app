angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'http://ocdemo.i2csmobile.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'http://test.mstgolf.com/?route=api2')
    .constant('WEBSITE', 'http://test.mstgolf.com')
    .constant('FORGOT_LINK', 'http://ocdemo.i2csmobile.com/index.php?route=account/forgotten')
    .constant('EMAIL', 'writetous@mstgolf.com')
    .constant('PHONE', '+60355668666')
    .constant('ANALYTICS_ID', 'UA-109156403-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#387ef5")
    .constant('LANGUAGES', [
            { name: "English", language_id: "en-US" }])
    .constant('WELCOME_SLIDES', [])
    .constant('RTL_LANGUAGES', ['ar'])
    .constant('INTERCOM_INTEGRATION', false) // please check www/app/common/services/intercom.service.js
    .constant('ONESIGNAL_APP_ID', "4873c96f-74ea-43f5-a79f-66c1d83baef7") // get OneSignal app id from http://onesignal.com
    .constant('GCM_SENDER_ID', "837115260317")
    .constant('MENU_LAYOUT', "tabs")

    // if demo mode is set to true, some dynamic configurations 
    // used only for demo app will appear in info section
    .constant('DEMO_MODE', false)