var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWifiInfo(config, callback) {
  var commandStr = "nmcli dev wifi list | grep '*' | sed -n '2p' | awk '{print $2}' && nmcli dev show wlp1s0 | grep IP4.ADDRESS | awk '{print $2}' && nmcli dev show wlp1s0 | grep GENERAL.HWADDR | awk '{print $2}' ";

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      data = stdOut.split('\n');
      var wifiInfo = {
        ssid: data[0],
        address: data[1],
        MAC: data[2]
      };
      callback && callback(null, wifiInfo);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      getWifiInfo(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWifiInfo(config, function (err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  }
};
