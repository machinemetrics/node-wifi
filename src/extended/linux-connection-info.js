const exec = require('child_process').exec;

const initial = {
  ipv4: {
    addresses: null,
    gateway: null
  },
  IP4: {
    ADDRESS: null,
    GATEWAY: null
  }
};

const commandStr =
  "nmcli -f ipv4.addresses,ipv4.gateway,IP4.ADDRESS,IP4.GATEWAY con show 'Wired connection 1' | awk '{print $1 $2}'";

function getConnectionInfo(config, connection, callback) {


  exec(commandStr, function (err, stdOut) {

    if (err) {
      callback && callback(err);
      return;
    }

    const output = Object.assign({}, initial,
      stdOut.split('\n').reduce((acc, item) => {
        const pair = item.split(":");
        [key, value] = pair;
        if (key.length) {
          [parent, child] = key.split(".");
          acc[parent] = acc[parent] || {};
          acc[parent][child.indexOf('[') === -1 ? child : child.slice(0, -3)] = value;
        }
        return acc;
      }, {})
    );

    function splitSubnet(address) {
      [address, subnet] = address.split('/');
      return ({
        address,
        subnet
      });
    }

    const connectionInfo = output.ipv4.addresses.length > 3 ? Object.assign(
            {},
            splitSubnet(output.ipv4.addresses),
            { gateway: output.ipv4.gateway }
          ) : Object.assign({}, splitSubnet(output.IP4.ADDRESS), {
            gateway: output.IP4.GATEWAY
          });

    callback && callback(null, connectionInfo);

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
