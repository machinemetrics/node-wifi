var windowsConnect = require('./windows-connect.js');
var windowsScan = require('./windows-scan.js');
var windowsDisconnect = require('./windows-disconnect.js');
var windowsGetCurrentConnections = require('./windows-current-connections');
var linuxConnect = require('./linux-connect');
var linuxDisconnect = require('./linux-disconnect');
var linuxGetCurrentConnections = require('./linux-current-connections');
var linuxScan = require('./linux-scan.js');
var macConnect = require('./mac-connect.js');
var macScan = require('./mac-scan.js');
var macGetCurrentConnections = require('./mac-current-connections');

// extended
var linuxGetWifiInfo = require('./extended/linux-wifi-info');
var linuxEnableWifi = require('./extended/linux-wifi-enable');
var linuxDisasbleWifi = require('./extended/linux-wifi-disable');
var linuxRescanWifi = require('./extended/linux-wifi-rescan');

var linuxCreateConnection = require('./extended/linux-connection-create');
var linuxRemoveConnection = require('./extended/linux-connection-remove');
var linuxGetConnectionInfo = require('./extended/linux-connection-info');

var linuxGetWiredDevices = require('./extended/linux-wired-devices');
var linuxGetWiredAddress = require('./extended/linux-wired-address');
// extended

var config = {
    debug : false,
    iface : null
};

function init(options) {
    if (options && options.debug) {
        config.debug = options.debug;
    }

    if (options && options.iface) {
        config.iface = options.iface;
    }

    var scan = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var connect = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var disconnect = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var getCurrentConnections = function () {
        throw new Error("ERROR : not available for this OS");
    };

    // extended
    var getWifiInfo = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var enableWifi = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var disableWifi = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var rescanWifi = function () {
        throw new Error("ERROR : not available for this OS");
    };

    var getConnectionInfo = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var removeConnection = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var createConnection = function () {
        throw new Error("ERROR : not available for this OS");
    };

    var getWiredDevices = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var getWiredAddress = function () {
        throw new Error("ERROR : not available for this OS");
    };
    // extended

    switch(process.platform) {
        case "linux":
            connect = linuxConnect(config);
            scan = linuxScan(config);
            disconnect = linuxDisconnect(config);
            getCurrentConnections = linuxGetCurrentConnections(config);

            // extended
            getWifiInfo = linuxGetWifiInfo(config);
            enableWifi = linuxEnableWifi(config);
            disableWifi = linuxDisasbleWifi(config);
            rescanWifi = linuxRescanWifi(config);

            getConnectionInfo = linuxGetConnectionInfo(config);
            removeConnection = linuxRemoveConnection(config);
            createConnection = linuxCreateConnection(config);

            getWiredDevices = linuxGetWiredDevices(config);
            getWiredAddress = linuxGetWiredAddress(config);
            // extended
            break;
        case "darwin":
            connect = macConnect(config);
            scan = macScan(config);
            getCurrentConnections = macGetCurrentConnections(config);
            break;
        case "win32":
            connect = windowsConnect(config);
            scan = windowsScan(config);
            disconnect = windowsDisconnect(config);
            getCurrentConnections = windowsGetCurrentConnections(config);
            break;
        default:
            throw new Error("ERROR : UNRECOGNIZED OS");
    }
    exports.scan = scan;
    exports.connect = connect;
    exports.disconnect = disconnect;
    exports.getCurrentConnections = getCurrentConnections;

    //extended
    exports.getWifiInfo = getWifiInfo;
    exports.enableWifi = enableWifi;
    exports.disableWifi = disableWifi;
    exports.rescanWifi = rescanWifi;
    
    exports.getConnectionInfo = getConnectionInfo;
    exports.removeConnection = removeConnection;
    exports.createConnection = createConnection;
    
    exports.getWiredDevices = getWiredDevices;
    exports.getWiredAddress = getWiredAddress;
    //extended
}

exports.init = init;
exports.scan = function () {
    throw new Error("ERROR : use init before");
};

exports.connect = function () {
    throw new Error("ERROR : use init before");
};

exports.disconnect = function () {
    throw new Error("ERROR : use init before");
};

exports.getCurrentConnections = function () {
    throw new Error("ERROR : use init before");
};

// extended
exports.getWifiInfo = function () {
    throw new Error("ERROR : use init before");
};

exports.enableWifi = function () {
    throw new Error("ERROR : use init before");
};

exports.disableWifi = function () {
    throw new Error("ERROR : use init before");
};

exports.rescanWifi = function () {
    throw new Error("ERROR : use init before");
};

exports.getConnectionInfo = function () {
    throw new Error("ERROR : use init before");
};

exports.createConnection = function () {
    throw new Error("ERROR : use init before");
};

exports.removeConnection = function () {
    throw new Error("ERROR : use init before");
};

exports.getWiredDevices = function () {
    throw new Error("ERROR : use init before");
};

exports.getWiredAddress = function () {
    throw new Error("ERROR : use init before");
};
//extended
