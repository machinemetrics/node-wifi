var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredDeviceAddress(config, device, callback) {

  var commandStr = "nmcli -f GENERAL.HWADDR dev show " + device + " | awk '{print $2}'"

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var address = stdOut.split('\n')[0];

      callback && callback(null, address);
  });
}

module.exports = function (config) {
  return function (device, callback) {
    if (callback) {
      getWiredDeviceAddress(config, device, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredDeviceAddress(config, device, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      });
    }
  }

};
