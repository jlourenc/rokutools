var ecp = require('../helpers/ecp');
var secretScreen = require('../helpers/secret-screen');
var express = require('express');
var router = express.Router();

router.param('ip', function(req, res, next, ip) {
    if (ip.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)) {
        next();
    } else {
        res.sendStatus(403);
    }
});

router.param('key', function(req, res, next, key) {
    if (key.match(/^(?:home|rev|fwd|play|select|left|right|down|up|back|instantreplay|info|backspace|search|enter)/i)) {
        next();
    } else {
        res.sendStatus(403);
    }
});

router.get('/query/apps/:ip', function(req, res, next) {
    ecp.queryApps(req.params.ip, function(body) {
        res.append('Content-Type', 'application/json');
        res.append('Cache-Control', 'no-cache');
        res.send(body);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/query/device-info/:ip', function(req, res, next) {
    ecp.queryDeviceInfo(req.params.ip, function(body) {
        res.append('Content-Type', 'application/json');
        res.append('Cache-Control', 'no-cache');
        res.send(body);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/query/icon/:app_id/:ip', function(req, res, next) {
    ecp.queryIcon(req.params.ip, req.params.app_id, function(contentType, body) {
        res.append('Content-Type', contentType);
        res.append('Cache-Control', 'no-cache');
        res.send(body);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/keypress/:key/:ip', function(req, res, next) {
    ecp.pressKey(req.params.ip, req.params.key, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/antenna/:ip', function(req, res, next) {
    secretScreen.showAntennaScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/channel-info/:ip', function(req, res, next) {
    secretScreen.showChannelInfoScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/device1/:ip', function(req, res, next) {
    secretScreen.showDevice1Screen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/device2/:ip', function(req, res, next) {
    secretScreen.showDevice2Screen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/dev/:ip', function(req, res, next) {
    secretScreen.showDevScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/network/:ip', function(req, res, next) {
    secretScreen.showNetworkScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/platform/:ip', function(req, res, next) {
    secretScreen.showPlatformScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/quality/:ip', function(req, res, next) {
    secretScreen.showQualityScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/reboot/:ip', function(req, res, next) {
    secretScreen.showRebootScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.get('/secret-screen/wireless/:ip', function(req, res, next) {
    secretScreen.showWirelessScreen(req.params.ip, function() {
        res.append('Cache-Control', 'no-cache');
        res.sendStatus(200);
    }, function (error) {
        res.sendStatus(403);
    });
});

router.all('/*', function (req, res, next) {
    res.sendStatus(403);
});

module.exports = router;
