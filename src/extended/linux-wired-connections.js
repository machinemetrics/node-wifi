var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredConnections(config, callback) {

  var commandStr = "nmcli connection show --active | grep 'Wired connection' | awk '{print $6}'"

  exec(commandStr, env, function (err, stdOut) {
    if (err) {
      callback && callback(err);
      return;
    }
    var wiredConnections = stdOut.split('\n');

    callback && callback(null, wiredConnections);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      getWiredConnections(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredConnections(config, function (err, networks) {
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

