var exec = require('child_process').exec;
var util = require('util');
var env = require('../env');

function createConnection(config, info, callback) {
  var commandStr;
  if (info.manual) {
    commandStr = "nmcli con add ifname " + info.ifname + " type ethernet ip4 " + info.ip + " gw4 " + info.gw;
  } else {
    commandStr = "nmcli con add ifname " + info.ifname + " type ethernet";
  }

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}


module.exports = function (config) {

    return function(info, callback) {
      if (callback) {
        createConnection(config, info, callback);
      } else {
        return new Promise(function (resolve, reject) {
          createConnection(config, info, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        });
      }
    }
}
