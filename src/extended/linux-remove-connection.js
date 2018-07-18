var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function removeConnection(config, connection, callback) {

  var commandStr = "nmcli con del " + connection;

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}

module.exports = function (config) {
  return function (connection, callback) {
    if (callback) {
      removeConnection(config, connection, callback);
    } else {
      return new Promise(function (resolve, reject) {
        removeConnection(config, connection, function (err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        })
      });
    }
  }
};
