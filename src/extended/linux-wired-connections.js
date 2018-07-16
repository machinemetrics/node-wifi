var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredConnections(config, device, callback) {

  var commandStr = "nmcli connection show --active | grep 'Wired connection' | awk '{print $6}'"

  exec(commandStr, env, function (err, stdOut) {
    if (err) {
      callback && callback(err);
      return;
    }
    var wiredConnections = [];
    var connections = stdOut.split('\n');
    if (connections.length > 0) {
      wiredConnections = connections;
    }

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

