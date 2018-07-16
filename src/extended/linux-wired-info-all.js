var exec = require('child_process').exec;
var networkUtils = require('../network-utils');
var env = require('../env');

function getWiredInfoAll(config, device, callback) {

  var commandStr = "nmcli connection show --active | grep 'Wired connection' | awk '{print $6}'"

  exec(commandStr, env, function (err, stdOut) {
    if (err) {
      callback && callback(err);
      return;
    }
    var wiredNetworksInfo = [];
    var networks = stdOut.split('\n');
    if (networks.length < 1) {
      callback && callback(null, wiredNetworksInfo);
    }

    networks.array.forEach(element => {
      var helpCommandStr = "nmcli dev show " + element +
        " | grep IP4.ADDRESS | awk '{print $2}' && nmcli dev show " + element +
        " | grep IP4.GATEWAY | awk '{print $2}' && nmcli dev show " + element +
        " | grep GENERAL.HWADDR | awk '{print $2}'";
      exec(helpCommandStr, env, function (err, stdOut) {
        if (err) {
          return;
        }
        var data = stdOut.split('\n');
        var wiredInfo = {
          address: data[0].split('/')[0],
          subnet: data[0].split('/')[1],
          gateway: data[1],
          MAC: data[2]
        };
        console.log('Evo mi info o prvom enpa39', wiredInfo);
        wiredNetworksInfo.push(wiredInfo);
        console.log('Evo ih pushao', wiredNetworksInfo)
      });
    });

    console.log('Sinhron sam', wiredNetworksInfo);
    callback && callback(null, wiredNetworksInfo);
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

