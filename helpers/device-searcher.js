var ssdp = require('node-ssdp');

function DeviceSearcher () {
    var devices = {};
    var ssdpClient = new ssdp.Client().on('response', function (headers, statusCode, rinfo) {
        if (statusCode === 200) {
            parseSSDPDeviceResponse(headers, rinfo);
        }
    });

    function parseSSDPDeviceResponse (headers, rinfo) {
        var usn = headers['USN'].split(':')[3];
        var expiry = parseInt(headers['CACHE-CONTROL'].split('=')[1], 10);

        devices[usn] = {
            ip: rinfo.address,
            expiry: expiry
        }
    }

    setInterval(function () {
        devicesToBeDeleted = [];

        for (var key in devices) {
            devices[key].expiry -= 60;
            if (devices[key].expiry <= 0) {
                devicesToBeDeleted.push(key);
            }
        }

        for (var key in devicesToBeDeleted) {
            delete devices[key];
        }
    }, 60000);

    this.run = function () {
        ssdpClient.search('roku:ecp');
    }

    this.get = function () {
        var res = { devices: [] };

        for (var key in devices) {
            res.devices.push({
                usn: key,
                ip: devices[key].ip
            });
        }

        return res;
    }
}

deviceSearcher = new DeviceSearcher();
deviceSearcher.run();

module.exports = deviceSearcher;
