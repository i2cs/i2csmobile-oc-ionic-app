angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'https://glamourbeauty.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'https://glamourbeauty.com/index.php?route=api2')
    .constant('WEBSITE', 'https://glamourbeauty.com')
    .constant('FORGOT_LINK', 'https://glamourbeauty.com/index.php?route=account/forgotten')
    .constant('EMAIL', 'amal@glamourbeauty.net')
    .constant('PHONE', '966565494620')
    .constant('ANALYTICS_ID', 'UA-79548648-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#387ef5")
    .constant('LANGUAGES', [
            { name: "English", language_id: "en-US" },
            { name: "French", language_id: "fr-FR" },
            { name: "Chinese", language_id: "zh-CN" },
            { name: "Arabic", language_id: "ar-EG" }])
    .constant('WELCOME_SLIDES', [
            {
                title: "Welcome 😍 to i2CSMobile Demo!",
                text: 'congratulations! You have installed i2CSMobile OpenCart demo on your phone. This demo app contains featres you can integrate with your OpenCart website<br/><br/>💬 Talk with us! We would love to help you create a mobile app for your OpenCart/WooCommerce website',
                image: 'img/welcome/slide1.gif'
            },
            {
                title: "Complete Checkout with Payment Integration",
                text: 'Convert your OpenCart store into fully functional mobile app and start accepting new orders.',
                image: 'img/welcome/slide2.png'
            },
            {
                title: "Push Notifications & More",
                text: 'Reach all your mobile app users with power of push notifications. Send product updates, offers or notices within seconds',
                image: 'img/welcome/slide3.png'
            },
            {
                title: "Multiple Languages and RTL Layout Support",
                text: 'Talk in your customers native language with i2CSMobile i18n framework. This app supports RTL (Right to Left) layout for Arabic languages',
                image: 'img/welcome/slide4.png'
            },
            {
                title: "Customizable & Full Source Code",
                text: 'i2CSMobile is built with Ionic Framework and easily customizable the way you want. And the best thing is, we provide full source code for the mobile app',
                image: 'img/welcome/slide5.png'
            }
    ])
    .constant('RTL_LANGUAGES', ['ar'])
    .constant('INTERCOM_INTEGRATION', false) // please check www/app/common/services/intercom.service.js
    .constant('ONESIGNAL_APP_ID', "d628b561-585b-4b3f-98bc-569caea3f59c") // get OneSignal app id from http://onesignal.com
    .constant('GCM_SENDER_ID', "371712602795")
    .constant('MENU_LAYOUT', "tabs")

    // if demo mode is set to true, some dynamic configurations 
    // used only for demo app will appear in info section
    .constant('DEMO_MODE', false)