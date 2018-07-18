const { execFile } = require('child_process');
var request = require('request');
var fs = require('fs');

var pid = null;

exports.Connect = function() {
  const Process = execFile('openvpn.exe', ['--config', 'CERTIFICATE.ovpn'], (error, stdout, stderr) => {
    if (error) {
      return console.log("Child PRC", error)
    }
    console.log("Open VPN CONNECT Close");
  });
  pid = Process;
  console.log(`Spawned child pid: ${Process.pid}`);

  Process.stdout.on('data', function(data) {
    if (data.split('Error')[1] !== undefined) {
      return console.log('Error: ', data.split('Error')[1]);
    }

    if (data.split('Sequence ')[1] !== undefined) {
      return console.log('Initialization Connekt: OK');
    }

  });
}

exports.Disconnect = function () {
    if (pid === null){
      return console.log("No connection");
    }
    pid.kill();
  console.log("Disconnect Succes");
}


exports.LoadCert =  function () {
  var CERTIFICATE = fs.createWriteStream(`CERTIFICATE.ovpn`);
    request({
        url: "http://127.0.0.1:3232/ovpkey/5b2d0f0a112a44177ded0042",
        method: "GET"
      }, function(err, httpResponse, body) {
         if(err)
          return console.log(err);
    }).pipe(CERTIFICATE);
      console.log('OK');
}














////
