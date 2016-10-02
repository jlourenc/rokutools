var http = require('http');
var ecpParser = require('./ecp-parser');

function Ecp () {
    var port = '8060';
    var commands = {
        apps: '/query/apps',
        deviceInfo: '/query/device-info',
        keypress: '/keypress/',
        icon: '/query/icon/'
    };

    function getXml (options, success, failure) {
        http.get(options, function (response) {
            var body = '';
            response.on('data', function(data) {
                body += data;
            });
            response.on('end', function() {
                success(body);
            });
        }).on("error", function(error) {
            failure(error);
        });
    };

    function getBinary (options, success, failure) {
        http.get(options, function (response) {
            var body = [];
            response.on('data', function(data) {
                body.push(data);
            });
            response.on('end', function() {
                success(response.headers['content-type'], Buffer.concat(body));
            });
        }).on("error", function(error) {
            failure(error);
        });
    };


    this.pressKey = function (ip, key, success, failure) {
        http.request({
            host: ip,
            port: port,
            path: commands.keypress + key,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': 0
            }
        }, function (response) {
            success();
        }).on("error", function(error) {
            failure(error);
        }).end();
    };

    this.queryApps = function (ip, success, failure) {
        getXml({
            host: ip,
            port: port,
            path: commands.apps
        }, function (body) {
            ecpParser.parseApps(body, function (json) {
                success(json);
            });
        }, failure);
    };

    this.queryDeviceInfo = function (ip, success, failure) {
        getXml({
            host: ip,
            port: port,
            path: commands.deviceInfo
        }, function (body) {
            ecpParser.parseDeviceInfo(body, function (json) {
                success(json);
            });
        }, failure);
    };

    this.queryIcon = function (ip, appId, success, failure) {
        getBinary({
            host: ip,
            port: port,
            path: commands.icon + appId
        }, success, failure);
    };
}

module.exports = new Ecp();
