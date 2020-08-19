var Gpio = require('onoff').Gpio;
var ip = require('ip');
var LED1 = new Gpio(23, 'out');
var LED2 = new Gpio(24, 'out');
var LED3 = new Gpio(25, 'out');

var stepPin = new Gpio(16, 'out');
var dirPin = new Gpio(20, 'out');

var EnPin = new Gpio(21, 'out');
var EnPin1 = new Gpio(4, 'out');
var EnPin2 = new Gpio(17, 'out');
var EnPin3 = new Gpio(27, 'out');

var Arriba = new Gpio(5, 'in', 'both');
var Abajo = new Gpio(6, 'in', 'both');

var FC0 = new Gpio(12, 'in', 'both');
var FC01 = new Gpio(22, 'in', 'both');
var FC02 = new Gpio(10, 'in', 'both');
var FC03 = new Gpio(9, 'in', 'both');


var FC1 = new Gpio(13, 'in', 'both');
var FC2 = new Gpio(19, 'in', 'both');
var FC3 = new Gpio(26, 'in', 'both');

var pulso;
var IO;

var FC0P=0;
var FC01P=0;
var FC02P=0;
var FC03P=0;

var FC1P=0;
var FC2P=0;
var FC3P=0;


var btnA=1;
var btnB=1;

var flagdir=0;

function dpslog(req, res) {

    console.log(req.query);
    console.log("req init app");
    res.status(200).send({
      estado: "OK",
      ip: ip.address()
    });
  
  }

function socketSend(io) {
    IO = io;
}

function initAbajo() {
    setAbajo();
}


function setAbajo() {

    dirPin.writeSync(1);
    console.log('buscando Abajo');
    IO.emit("messages", "buscando Abajo");
    EnPin.writeSync(0);
    EnPin1.writeSync(0);
    EnPin2.writeSync(0);
    EnPin3.writeSync(0);
    pulso = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);

}

function setArriba() {

    dirPin.writeSync(0); 
    console.log('buscando Arriba');
    IO.emit("messages", "buscando Arriba");
    EnPin.writeSync(0);
    EnPin1.writeSync(0);
    EnPin2.writeSync(0);
    EnPin3.writeSync(0);
    pulso = setInterval(_ => stepPin.writeSync(stepPin.readSync() ^ 1), 1);
}

function leds(led1,led2,led3){
    LED1.writeSync(led1);
    LED2.writeSync(led2);
    LED3.writeSync(lede3);
}

function eventStopAll(){
 if(FC0P==1 && FC01P==1  && FC02P==1 && FC03P==1 ){
    console.log('Paro todos los motores');
    btnA=0;
    btnB=1;
 }

}

function stop(){
    clearInterval(pulso);
    EnPin.writeSync(1);
    EnPin1.writeSync(1);
    EnPin2.writeSync(1);
    EnPin3.writeSync(1);
}


Arriba.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
  
    if (value == 0 && flagdir == 1 && btnA==0) {
      bntA=1;
      flagdir=0;
      setArriba();
    }
  });
  
  Abajo.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
  
    if (value == 0 && flagdir == 0 && btnB==0) {
      flagdir=1;
      setAbajo();
    }
  });


  FC1.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 && FC1P==0 && flagdir == 1) {
      FC1P=1;
      bntA=0;
      btnB=0;
      console.log('FC1');
      IO.emit("messages", "nivel1");
      stop();
      leds(1,0,0);
    }
  });

  FC2.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 && FC1P==0 && flagdir == 1) {
      FC1P=1;
      bntA=0;
      btnB=0;
      console.log('FC2');
      IO.emit("messages", "nivel1");
      stop();
      leds(0,1,0);
    }
  });

  FC3.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 && FC1P==0 && flagdir == 1) {
      FC1P=1;
      bntA=0;
      btnB=0;
      console.log('FC3');
      IO.emit("messages", "nivel1");
      stop();
      leds(0,0,1);
    }
  });


FC0.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 &&  FC0P==0) {
      FC0P=1;
      console.log('FC0');
      console.log('stop motor1');
      IO.emit("messages", "nivel0");
      EnPin.writeSync(1);
      eventStopAll();
    }    
  });

  FC01.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 &&  FC01P==0 ) {
        FC01P=1;
      console.log('FC01');
      console.log('stop motor2');
      IO.emit("messages", "nivel0");
      EnPin1.writeSync(1);
      eventStopAll();
    }    
  });

  FC02.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 &&  FC02P==0 ) {
      FC02P=1;
      console.log('FC02');
      console.log('stop motor3');
      IO.emit("messages", "nivel0");
      EnPin2.writeSync(1);
      eventStopAll();
    }    
  });

  FC03.watch(function (err, value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    if (value == 0 &&  FC03P==0) {
      FC03P=1;
      console.log('FC03');
      console.log('stop motor4');
      IO.emit("messages", "nivel0");
      EnPin3.writeSync(1);
      eventStopAll();
    }    
  });

 


process.on('SIGINT', _ => {
    LED1.unexport();
    LED2.unexport();
    LED3.unexport();
    stepPin.unexport();
    EnPin.unexport();
    EnPin1.unexport();
    EnPin2.unexport();
    EnPin3.unexport();
    dirPin.unexport();
    FC0.unexport();
    FC01.unexport();
    FC02.unexport();
    FC03.unexport();
    FC1.unexport();
    FC2.unexport();
    FC3.unexport();
});



module.exports = {
    dpslog,
    socketSend,
    initAbajo
}