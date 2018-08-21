var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredDevices(config, callback) {


  console.log('USAO U GET WIRED DEVICES');
  var commandStr = "nmcli -t -f DEVICE,TYPE,STATE,CONNECTION dev status | grep ethernet"

  exec(commandStr, env, function(err, stdOut) {
      if (err) {
        callback && callback(err);
        return;
      }
      var data = stdOut.split('\n');
      data.pop();
      console.log('GET WIRED DEVICES', data);
      var wiredDevices = [];

      data.forEach(element => {
        var info = element.split(':');
        info.pop();
        console.log('ELEMENT', element);
        console.log('INFO', info);
        wiredDevices.push({
          device: info[0],
          connected: info[2] === 'connected' ? true : false,
          connection: info[3] === '--' ? null : info[3]
        });
      });
      
      callback && callback(null, wiredDevices);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      getWiredDevices(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getWiredDevices(config, function (err, data) {
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
