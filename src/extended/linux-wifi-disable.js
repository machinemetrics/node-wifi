var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function disableWifi(config, callback) {
  var commandStr = "nmcli radio wifi off";

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}

module.exports = function (config) {

  return function(ap, callback) {
    if (callback) {
      disableWifi(config, ap, callback);
    } else {
      return new Promise(function (resolve, reject) {
        disableWifi(config, ap, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    }
  }
}
