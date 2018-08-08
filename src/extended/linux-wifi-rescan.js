var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function rescanWifi(config, callback) {
  var commandStr = "nmcli dev wifi rescan";

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      rescanWifi(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        rescanWifi(config, function (err, networks) {
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
