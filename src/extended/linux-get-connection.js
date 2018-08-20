var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getConnection(config, device, callback) {

  var commandStr = "nmcli -t -f UUID,DEVICE con show | grep " + device + " | awk -F':' '{print $1}'"

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var data = stdOut;
      
      callback && callback(null, data);
  });
}

module.exports = function (config) {
  return function (device, callback) {
    if (callback) {
      getConnection(config, device, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getConnection(config, device, function (err, networks) {
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
