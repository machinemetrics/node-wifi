var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredInfo(config, info, callback) {

  var commandStr = "nmcli con show " + info.connection;
  if (info.active) {
    commandStr += " | grep IP4.ADDRESS | awk '{print $2}' && nmcli con show " + info.connection + 
    " | grep IP4.GATEWAY | awk '{print $2}'" 
  } else {
    commandStr += " | grep ipv4.addresses | awk '{print $2}' && nmcli con show " + info.connection + 
    " | grep ipv4.gateway | awk '{print $2}'" 
  }
  commandStr += " && nmcli dev show " + info.device + 
  " | grep GENERAL.HWADDR | awk '{print $2}'"

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var data = stdOut.split('\n');
      data.pop();
      
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
  return function (info, callback) {
    if (callback) {
      getWiredInfo(config, info, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredInfo(config, info, function (err, networks) {
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
