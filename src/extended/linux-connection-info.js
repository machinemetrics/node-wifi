var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getConnectionInfo(config, connection, callback) {
  // TODO: This first nmcli command appears to not do anything useful for us in particular? Remove?
  var commandStr = "nmcli -f ipv4.addresses,ipv4.gateway con show '" + connection +
    "' | awk '{print $2}' && nmcli -f IP4.ADDRESS,IP4.GATEWAY con show '" + connection +
    "' | awk '{print $2}'"

  exec(commandStr, env, function (err, stdOut) {
    if (err) {
      callback && callback(err);
      return;
    }

    var data = stdOut.split('\n');

    callback && callback(null, {
      address: data[2].split('/')[0],
      subnet: data[2].split('/')[1],
      gateway: data[3]
    });
  });
}

module.exports = function (config) {
  return function (connection, callback) {
    if (callback) {
      getConnectionInfo(config, connection, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getConnectionInfo(config, connection, function (err, data) {
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
