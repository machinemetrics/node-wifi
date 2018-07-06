var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWifiInfo(config, callback) {
  var commandStr = "nmcli -t -f ssid dev wifi  " 
                + "&& nmcli dev show wlp1s0 | grep IP4.GATEWAY | awk '{print $2}' "
                + "&& nmcli dev show wlp1s0 | grep GENERAL.HWADDR | awk '{print $2}' ";

  exec(commandStr, env, function(err, wifiInfo) {
      if (err) {
        callback && callback(err);
        return;
      }
      info = wifiInfo.split('\n');
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
