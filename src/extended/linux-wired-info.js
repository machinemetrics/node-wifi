var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredInfo(config, device, callback) {

  var commandStr = "nmcli dev show " + device + 
  " | grep IP4.ADDRESS | awk '{print $2}' && nmcli dev show " + device + 
  " | grep IP4.GATEWAY | awk '{print $2}' && nmcli dev show " + device + 
  " | grep GENERAL.HWADDR | awk '{print $2}'";

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var data = stdOut.split('\n');
      var wiredInfo;
      if (data.length > 1) {
        wiredInfo = {
          address: data[0].split('/')[0],
          subnet: data[0].split('/')[1],
          gateway: data[1],
          MAC: data[2],
          connected: true
        };
      } else {
        wiredInfo = {
          address: '',
          subnet: '',
          gateway: '',
          MAC: data[0],
          connected: false
        };
      }

      callback && callback(null, wiredInfo);
  });
}

module.exports = function (config) {
  return function (device, callback) {
    if (callback) {
      getWiredInfo(config, device, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredInfo(config, device, function (err, networks) {
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
