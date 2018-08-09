var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function enableWifi(config, callback) {
  var commandStr = "nmcli radio wifi on";

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      enableWifi(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        enableWifi(config, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }
};
