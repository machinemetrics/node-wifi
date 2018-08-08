var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function disableWifi(config, callback) {
  var commandStr = "nmcli radio wifi off";

  try {
    console.log('Node-wifi disable before exec');
    exec(commandStr, env, function (err, resp) {
      console.log('Node-wifi disabling wifi');
      callback && callback(err);
    });
  } catch (err) {
    console.log(err)
  }
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
