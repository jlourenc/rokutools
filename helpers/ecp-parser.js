var xml2js = require('xml2js');

function EcpParser () {
    this.parseApps = function (xml, success) {
        xml2js.Parser().parseString(xml, function (err, result) {
            var json = {apps: []};
            var apps = result.apps.app;

            for (index in apps) {
                json.apps.push({
                    id: apps[index]['$'].id,
                    name: apps[index]._,
                    type: apps[index]['$'].type,
                    version: apps[index]['$'].version
                });
            }

            success(json);
        });
    };

    this.parseDeviceInfo = function (xml, success) {
        xml2js.Parser().parseString(xml, function (err, result) {
            var json = {'device-info': {}};
            var deviceInfo = result['device-info'];

            for (key in deviceInfo) {
                json['device-info'][key] = deviceInfo[key][0];
            }

            success(json);
        });
    };
}

module.exports = new EcpParser();
