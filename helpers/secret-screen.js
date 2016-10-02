var ecp = require('./ecp');

function SecretScreen () {
    var keycombo = {
        antenna: ['home', 'home', 'home', 'home', 'home', 'fwd', 'down', 'rev', 'down', 'fwd'],
        channelInfo: ['home', 'home', 'home', 'up', 'up', 'left', 'right', 'left', 'right', 'left'],
        device1: ['home', 'home', 'home', 'home', 'home', 'fwd', 'fwd', 'fwd', 'rev', 'rev'],
        device2: ['home', 'home', 'home', 'home', 'home', 'up', 'right', 'down', 'left', 'up'],
        dev: ['home', 'home', 'home', 'up', 'up', 'right', 'left', 'right', 'left', 'right'],
        network: ['home', 'home', 'home', 'home', 'home', 'right', 'left', 'right', 'left', 'right'],
        platform: ['home', 'home', 'home', 'home', 'home', 'fwd', 'play', 'rev', 'play', 'fwd'],
        quality: ['home', 'home', 'home', 'home', 'home', 'rev', 'rev', 'rev', 'fwd', 'fwd'],
        reboot: ['home', 'home', 'home', 'home', 'home', 'up', 'rev', 'rev', 'fwd', 'fwd'],
        wireless: ['home', 'home', 'home', 'home', 'home', 'up', 'down', 'up', 'down', 'up']
    };

    function pressKey (ip, keycombo, index, success, failure) {
        ecp.pressKey(ip, keycombo[index], function() {
            if (index === keycombo.length-1) {
                success();
            } else {
                pressKey(ip, keycombo, index+1, success, failure);
            }
        }, function (error) {
            failure(error);
        });
    };


    this.showAntennaScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.antenna, 0, success, failure);
    };

    this.showChannelInfoScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.channelInfo, 0, success, failure);
    };

    this.showDevice1Screen = function (ip, success, failure) {
        pressKey(ip, keycombo.device1, 0, success, failure);
    };

    this.showDevice2Screen = function (ip, success, failure) {
        pressKey(ip, keycombo.device2, 0, success, failure);
    };

    this.showDevScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.dev, 0, success, failure);
    };

    this.showNetworkScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.network, 0, success, failure);
    };

    this.showPlatformScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.platform, 0, success, failure);
    };

    this.showQualityScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.quality, 0, success, failure);
    };

    this.showRebootScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.reboot, 0, success, failure);
    };

    this.showWirelessScreen = function (ip, success, failure) {
        pressKey(ip, keycombo.wireless, 0, success, failure);
    };
}

module.exports = new SecretScreen();
