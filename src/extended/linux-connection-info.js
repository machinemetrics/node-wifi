var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getConnectionInfo(config, connection, callback) {

  var commandStr = "nmcli -f ipv4.addresses,ipv4.gateway con show " + connection + 
  " | awk '{print $2}' && nmcli -f IP4.ADDRESS,IP4.GATEWAY con show " + connection + 
  " | awk '{print $2}'"


  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var data = stdOut.split('\n');
      data.pop();
      var connectionInfo;
      if (data.length === 2) {
        if (data[0] === '') {
          connectionInfo = {
            address: '',
            subnet: '',
            gateway: ''
          }
        } else {
          connectionInfo = {
            address: data[0].split('/')[0],
            subnet: data[0].split('/')[1],
            gateway: data[1]
          }
        }
      } else if (data.length === 4) {
        connectionInfo = {
          address: data[2].split('/')[0],
          subnet: data[2].split('/')[1],
          gateway: data[3]
        }
      }

      callback && callback(null, connectionInfo);
  });
}

module.exports = function (config) {
  return function (device, callback) {
    if (callback) {
      getConnectionInfo(config, info, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getConnectionInfo(config, device, function (err, data) {
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
