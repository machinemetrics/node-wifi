var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function disableWifi(config, callback) {
  var commandStr = "nmcli radio wifi off";

  exec(commandStr, env, function(err, resp) {
      console.log('Node-wifi disabling wifi');
      callback && callback(err);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      disableWifi(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        disableWifi(config, function (err, networks) {
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
