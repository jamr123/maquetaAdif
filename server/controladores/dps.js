var Gpio = require('onoff').Gpio;
var ip = require('ip');
var LED1 = new Gpio(23, 'out');
var LED2 = new Gpio(24, 'out');
var LED3 = new Gpio(25, 'out');

var stepPin = new Gpio(16, 'out');
var dirPin = new Gpio(20, 'out');
var EnPin = new Gpio(21, 'out');


var Arriba = new Gpio(5, 'in', 'both');
var Abajo = new Gpio(6, 'in', 'both');
var FC0 = new Gpio(12, 'in', 'both');
var FC1 = new Gpio(13, 'in', 'both');
var FC2 = new Gpio(19, 'in', 'both');
var FC3 = new Gpio(26, 'in', 'both');

var pulso;
var IO;

var puntero=0;
var flagAction=false;



function socketSend(io) { 
  IO = io;
}

function initAbajo() {
  setAbajo();
}

Arriba.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }

  if (value == 0 && flagAction==false ) {
   setArriba();
  }
});

Abajo.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }

  if (value == 0 && flagAction==false ) {
  setAbajo();
  }
});




FC0.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && puntero==0 && flagAction==true) {
    clearInterval(pulso);
    flagAction=false;
    console.log('FC0');
    IO.emit("messages", "nivel0");
    EnPin.writeSync(1);
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(0);
  }
});

FC1.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && puntero==1 && flagAction==true) {
    clearInterval(pulso);
    flagAction=false;
    console.log('FC1');
    EnPin.writeSync(1);
    IO.emit("messages", "nivel1");
    LED1.writeSync(1);
    LED2.writeSync(0);
    LED3.writeSync(0);
  }
});

FC2.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && puntero==2 && flagAction==true) {
    clearInterval(pulso);
    flagAction=false;
    EnPin.writeSync(1);
    console.log('FC2');
    IO.emit("messages", "nivel2");
    LED1.writeSync(0);
    LED2.writeSync(1);
    LED3.writeSync(0);
  }
});

FC3.watch(function (err, value) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  if (value == 0 && puntero==3 && flagAction==true) {
    clearInterval(pulso);
    flagAction=false;
    EnPin.writeSync(1);
    console.log('FC3');
    IO.emit("messages", "nivel3");
    LED1.writeSync(0);
    LED2.writeSync(0);
    LED3.writeSync(1);
  }
});

process.on('SIGINT', _ => {
  LED1.unexport();
  LED2.unexport();
  LED3.unexport();
  stepPin.unexport();
  EnPin.unexport();
  dirPin.unexport();
  FC0.unexport();
  FC1.unexport();
  FC2.unexport();
  FC3.unexport();
});


function setArriba(){
  flagAction=true;
  puntero=puntero +1;
  dirPin.writeSync(1);
  console.log('buscando Arriba');
  IO.emit("messages", "buscando Arriba");
  EnPin.writeSync(0);
  pulso = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1),1);
}

function setAbajo(){
  flagAction=true;
    puntero=0;
    dirPin.writeSync(0);
    console.log('buscando Abajo');
    IO.emit("messages", "buscando Abajo"); 
    EnPin.writeSync(0);
    pulso = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1),1);
}

function dpslog(req, res) {
 
  console.log(req.query);
  console.log("req init app");
  res.status(200).send({
    estado: "OK",
    ip:ip.address()
});

}


module.exports = {
  dpslog,
  socketSend,
  initAbajo
}