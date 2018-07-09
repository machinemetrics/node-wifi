var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredInfoAll(config, device, callback) {

  var commandStr = "nmcli dev show " + device + 
  " | grep IP4.ADDRESS | awk '{print $2}' && nmcli dev show " + device + 
  " | grep IP4.GATEWAY | awk '{print $2}' && nmcli dev show " + device + 
  " | grep GENERAL.HWADDR | awk '{print $2}'";

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      data = stdOut.split('\n');
      let wiredInfo = {
        address: data[0].split('/')[0],
        subnet: data[0].split('/')[1],
        gateway: data[1],
        MAC: data[2]
      };
      
      callback && callback(null, wiredInfo);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      getWiredInfoAll(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredInfoAll(config, function (err, networks) {
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

