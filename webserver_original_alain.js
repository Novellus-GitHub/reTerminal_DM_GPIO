
/*
  NOTICE:
  
  This program is focused towards the "externally available" 24 VDC GPIO pins on a 
  Seed Studios reTerminal DM.
  
  https://files.seeedstudio.com/wiki/reTerminalDM/reTerminal-DM-User-Manual.pdf
  
  See manual section 2.2.6 on page #13.
  
  == == ==
  
  All GPIO pins to be named per BCM (Broadcom) naming convention.
  
  == == ==
  
  Configuring the Digital INPUTS for the GPIO pins on your Raspberry Pi (and possibly others).
  
  Using the NODE.JS function "INOUT" does NOT give you the ability to configure the internal
  GPIO configuration as Pull-Up or Pull-Down. Read the INOUT documentation ahout this.
  
  For a "Low Active" input configuration, set the Internal GPIO resistors as PULL-UP.
       a LOW ( 0 VDC ) at the GPIO pin will cause the ***.watch function to detect a condition change.
  
  For a "High Active" input configuration, set the Internal GPIO resistors as PULL-DOWN
       a HIGH ( 3.3 VDC ) at the GPIO pin will cause the ***.watch function to detect a condition change.
       
       
  For the purposes of this program on an RPI, use:
  
  /boot/config.txt   Use nano to edit config.txt  ( sudo nano config.txt )
  
  Low active use:  gpio=16,17,22,23=pu,ip  ( pull-up & input ).
  
  High active use: gpio=16,17,22,23=pd,ip  ( pull-down & input ).
  
  
  == == ==
       
*/

var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var events = require("events");
var io = require('socket.io','net')(http); //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO - We will use BCM mode for GPIO pin naming.

/* reTerminal DM  has 4 24 VDC Digital INputs -  DI1 - GPIO16   DI2 - GPIO17   DI3 - GPIO22   DI4 - GPIO23  */
/* https://www.w3schools.com/nodejs/nodejs_raspberrypi_led_pushbutton.asp  */
/* re Terminal DM Digital OUTput Compatible Code: */


//  DI to DI4 are all BOOLEAN inluts. Typically a manual switch that will pass a HIGH or LOW depending on condition. High Active.
var DI1 = new Gpio(16, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 16 as DI1 input, and 'both' button presses, and releases should be handled
var DI2 = new Gpio(17, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 17 as DI2 input, and 'both' button presses, and releases should be handled
var DI3 = new Gpio(22, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 22 as DI3 input, and 'both' button presses, and releases should be handled
var DI4 = new Gpio(23, 'in', 'both', {debounceTimeout: 10}); //use GPIO pin 23 as DI4 input, and 'both' button presses, and releases should be handled

var GPIO16value = 0;  // This is a BOOLEAN input.
var GPIO17value = 0;  // This is a BOOLEAN input.
var GPIO22value = 0;  // This is a BOOLEAN input.
var GPIO23value = 0;  // This is a BOOLEAN input.

var DI1_GPIO16value = 0;  // experimental - future use - code debug.
var DI2_GPIO17value = 0;  // experimental - future use - code debug.
var DI3_GPIO22value = 0;  // experimental - future use - code debug.
var DI4_GPIO23value = 0;  // experimental - future use - code debug.

DI1.watch(function (err, value) { // Watch for hardware interrupts on DI1 / GPIO16, specify callback function.
  console.log('73 - Detected a Button Press on INPUT DI1 / GPIO16 - Entered the DI1.watch function.');
  if (err) { //if an error
    console.error('75 - DI1 / GPIO16 had an error', err); //output error message to console - should never be seen.
  return;
  }
  console.log('78 - No Errors reported by DI1 - Reading DI1 next.');
  /*  DI1 should be good - do something. */
  GPIO16value = (value);  // Copy DI1 value component to GPIO16value
  DI1_GPIO16value = (value) // Copy DI1 value component to DI1_GPIO16value
  // console.log(GPIO16value);
  console.log('83 - INPUT - DI1 / GPIO16 = '+GPIO16value);
  console.log('84 - DI1 State Changed - Sending new DI1 / GPIO16 state to ALL clients');
  io.emit('GPIO16', GPIO16value); // Send DI1 / GPIO16 status update to ALL clients
  io.emit('DI1_GPIO16', GPIO16value); // Send DI1 / GPIO16 status update to ALL clients
  console.log(GPIO16value);
  console.log(DI1_GPIO16value)
  console.log(' ');
  console.log('== == ==');
});

DI2.watch(function (err, value) { // Watch for hardware interrupts on DI2 / GPIO17, specify callback function.
  console.log('89 - Detected a Button Press on INPUT DI2 / GPIO17 - Entered the DI2.watch function.');
  if (err) { //if an error
    console.error('96 - DI2 / GPIO17 had an error', err); //output error message to console - should never be seen.
  return;
  }
  console.log('99 - No Errors reported by DI2 - Reading DI2 next.');
  /*  DI2 should be good - do something. */
  GPIO17value = (value); // Copy DI2 value component to GPIO17value
  DI2_GPIO17value = (value) // Copy DI2 value component to DI2_GPIO17value
  // console.log(GPIO17value);
  console.log('104 - INPUT - DI2 / GPIO17 = '+GPIO17value);
  console.log('105 - DI2 State Changed - Sending new DI2 / GPIO17 state to ALL clients');
  io.emit('GPIO17', GPIO17value); // Send DI2 / GPIO17 status update to ALL clients
  io.emit('DI2_GPIO17', GPIO17value); // Send DI2 / GPIO17 status update to ALL clients
  console.log(GPIO17value);
  console.log(DI2_GPIO17value)
  console.log(' ');
  console.log('== == ==');
});

DI3.watch(function (err, value) { // Watch for hardware interrupts on DI3 / GPIO22, specify callback function.
  console.log('115 - Detected a Button Press on INPUT DI3 / GPIO22 - Entered the DI3.watch function.');
  if (err) { //if an error
    console.error('117 - DI3  / GPIO22 had an error', err); //output error message to console - should never be seen.
  return;
  }
  console.log('120 - No Errors reported by DI3 - Reading DI3 next.');
  /*  DI3 should be good - do something. */
  GPIO22value = (value);  // Copy DI3 value component to GPIO22value
  DI3_GPIO22value = (value) // Copy DI3 value component to DI3_GPIO22value
  // console.log(GPIO22value);
  console.log('125 - INPUT - DI3 / GPIO22 = '+GPIO22value);
  console.log('126 - DI3 State Changed - Sending new DI3 / GPIO22 state to ALL clients');
  io.emit('GPIO22', GPIO22value); // Send DI3 / GPIO22 status update to ALL clients
  io.emit('DI3_GPIO22', GPIO22value); // Send DI3 / GPIO22 status update to ALL clients
  console.log(GPIO22value);
  console.log(DI3_GPIO22value)
  console.log(' ');
  console.log('== == ==');
});

DI4.watch(function (err, value) { // Watch for hardware interrupts on DI4 / GPIO23, specify callback function.
  console.log('136 - Detected a Button Press on INPUT DI4 / GPIO23 - Entered the DI4.watch function.');
  if (err) { //if an error
    console.error('138 - DI4  / GPIO23 had an error', err); //output error message to console - should never be seen.
  return;
  }
  console.log('141 - No Errors reported by DI4 - Reading DI4 next.');
  /*  DI4 should be good - do something. */
  GPIO23value = (value);  // Copy DI4 value componentto GPIO23value
  DI4_GPIO23value = (value) // Copy DI4 value component to DI4_GPIO22value
  // console.log(GPIO23value);
  console.log('146 - INPUT - DI4 / GPIO23 = '+GPIO23value);
  console.log('147 - DI4 State Changed - Sending new DI4 / GPIO23 state to ALL clients');
  io.emit('GPIO23', GPIO23value); // Send DI4 / GPIO23 status update to ALL clients
  io.emit('DI4_GPIO23', GPIO23value); // Send DI4 / GPIO223 status update to ALL clients
  console.log(GPIO23value);
  console.log(DI4_GPIO23value)
  console.log(' ');
  console.log('== == ==');
});


/* reTerminal DM  has 4 24 VDC Digital OUTputs -  DO1 - GPIO24   DO2 - GPIO25   DO3 - GPIO26   DO4 - GPIO6  */
/* re Terminal DM Digital OUTput Compatible Code: */
var DO1 = new Gpio(24, 'out'); //use GPIO pin 24 as output
var DO2 = new Gpio(25, 'out'); //use GPIO pin 25 as output
var DO3 = new Gpio(26, 'out'); //use GPIO pin 26 as output
var DO4 = new Gpio(6, 'out'); //use GPIO pin 6 as output

var GPIO24value = 0;  // Turn GPIO24 to OFF by default
var GPIO25value = 0;  // Turn GPIO25 to OFF by default
var GPIO26value = 0;  // Turn GPIO26 to OFF by default
var GPIO6value = 0;  // Turn GPIO6 to OFF by default

/****** CONSTANTS******************************************************/

const WebPort = 80;


/* if you want to run WebPort on a port lower than 1024 without running
 * node as root, you need to run following from a terminal on the pi
 * sudo apt update
 * sudo apt install libcap2-bin
 * sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
 */
 
/*************** Web Browser Communication ****************************/



// Start http webserver

/* reTerminal DM  has 4 24 VDC Digital OUTputs -  DO1 - GPIO24   DO2 - GPIO25   DO3 - GPIO26   DO4 - GPIO6  */
/* reTerminal DM  has 4 24 VDC Digital INputs -  DI1 - GPIO16   DI2 - GPIO17   DI3 - GPIO22   DI4 - GPIO23  */

http.listen(WebPort, function() {  // This gets call when the web server is first started.

DO1.writeSync(GPIO24value); // turn physical GPIO24 pin on or off
DO2.writeSync(GPIO25value); // turn physical GPIO25 pin on or off
DO3.writeSync(GPIO26value); // turn physical GPIO26 pin on or off
DO4.writeSync(GPIO6value); // turn physical GPIO6 pin on or off

console.log(' ');
console.log('=== === ===');
console.log(' ');
console.log('200 - Server running on Port '+WebPort);
console.log('201 - reTerminal DM 24V Digital Outputs');
console.log('202 - DO1 / GPIO24 = '+GPIO24value);
console.log('203 - DO2 / GPIO25 = '+GPIO25value);
console.log('204 - DO3 / GPIO26 = '+GPIO26value);
console.log('205 - DO4 / GPIO6 = '+GPIO6value);
console.log(' ');
console.log('207 - reTerminal DM 24V Digital Inputs');
console.log('208 - DI1 / GPIO16 = '+GPIO16value);
console.log('209 - DI2 / GPIO17 = '+GPIO17value);
console.log('210 - DI3 / GPIO22 = '+GPIO22value);
console.log('211 - DI4 / GPIO23 = '+GPIO23value);
console.log(' ');
console.log('=== === ===');
console.log(' ');
 } 
); 



// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='./') {
      console.log('228 - Retrieving default index.html file');
      filename= './index.html';
    }
    
    // Initial content type
    var contentType = 'text/html';
    
    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }
    

    
    fs.readFile(__dirname + '/public/' + filename, function(err, content) {
	if(err) {
	    console.log('2261 - File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/404.html', function(err, content) {
		res.writeHead(249, {'Content-Type': 'text/html'}); 
		return res.end(content,'utf8'); //display 404 on error
	    });
	}
	else {
	    // Success
	    res.writeHead(255, {'Content-Type': contentType}); 
	    return res.end(content,'utf8');
	}
      
    });
}


// Execute this when web server is terminated
process.on('SIGINT', function () { //on ctrl+c

  console.log(' ');
  console.log('=== === ===');
  console.log(' ');

  console.log('284 - Shutting Down - Attempting a graceful disconnect...');

  DO1.writeSync(0); // Turn DO1 off
  DO1.unexport(); // Unexport DO1 / GPIO24 to free resources
  
  DO2.writeSync(0); // Turn DO2 off
  DO2.unexport(); // Unexport DO2 / GPIO25 to free resources
  
  DO3.writeSync(0); // Turn DO3 off
  DO3.unexport(); // Unexport DO3 / GPIO26 to free resources
  
  DO4.writeSync(0); // Turn DO4 off
  DO4.unexport(); // Unexport DO4 / GPIO6 to free resources
  
  DI1.unexport(); // Unexport DI1 / GPI16 to free resources
  DI2.unexport(); // Unexport DI2 / GPI17 to free resources
  DI3.unexport(); // Unexport DI3 / GPI22 to free resources
  DI4.unexport(); // Unexport DI4 / GPI23 to free resources

  console.log(' ');
  console.log('=== === ===');
  console.log(' ');

  process.exit(); //exit completely
}); 


/****** io.socket is the websocket connection to the CLIENTS's browser********/



/****** NEW Client Connected - Send ALL GPIO Status' ********/

io.sockets.on('connection', function (socket) {// WebSocket Connection

    console.log('329 - A new client has connected to server. Send the status of every GPIO.');
    console.log('== == ==');
    
    socket.emit('GPIO24', GPIO24value);
    socket.emit('GPIO25', GPIO25value);
    socket.emit('GPIO26', GPIO26value);
    socket.emit('GPIO6', GPIO6value);
    
    socket.emit('GPIO16', GPIO16value);
    socket.emit('DI1_GPIO16', DI1_GPIO16value);
    socket.emit('GPIO17', GPIO17value);
    socket.emit('DI2_GPIO17', DI2_GPIO17value);
    socket.emit('GPIO22', GPIO22value);
    socket.emit('DI3_GPIO22', DI3_GPIO22value);
    socket.emit('GPIO23', GPIO23value);
    socket.emit('DI4_GPIO23', DI4_GPIO23value);
    
 /****** End NEW Client Connected - Send ALL GPIO Status' ********/   
  
  
 /***  https://www.w3schools.com/nodejs/nodejs_raspberrypi_webserver_websocket.asp ***/
  
  
    // this gets called whenever client presses DO1 / GPIO24 Toggle - slide button on the visualization.
    socket.on('GPIO24T', function(data) { 
	if (GPIO24value) GPIO24value = 0;
	else GPIO24value = 1;
	console.log('346 - D01 Slide Button actuated - New GPIO24 value = '+GPIO24value);
	DO1.writeSync(GPIO24value); //turn physical GPIO24 pin on or off
	console.log('348 - Sending new DO1 / GPIO24 state to ALL clients');
	io.emit('GPIO24', GPIO24value); //send button status to ALL clients
	console.log('350 - Slide OUTPUT - DO1 / GPIO24 = '+GPIO24value);
	console.log('== == ==');
    });
    
    // this gets called whenever client presses DO2 / GPIO25 Toggle - slide button on the visualization.
    socket.on('GPIO25T', function(data) { 
	if (GPIO25value) GPIO25value = 0;
	else GPIO25value = 1;
	console.log('358 - DO2 Slide Button actuated - New GPIO25 value = '+GPIO25value);
	DO2.writeSync(GPIO25value); //turn physical GPIO25 pin on or off
	console.log('360 - Sending new DO2 / GPIO25 state to ALL clients');
	io.emit('GPIO25', GPIO25value); //send button status to ALL clients
	console.log('362 - Slide OUTPUT - DO2 / GPIO25 = '+GPIO25value);
	console.log('== == ==');
    });
    
    // this gets called whenever client presses DO3 / GPIO26 Toggle - slide button on the visualization.
    socket.on('GPIO26T', function(data) { 
	if (GPIO26value) GPIO26value = 0;
	else GPIO26value = 1;
	console.log('370 - DO3 Slide Button actuated - New GPIO26 value = '+GPIO26value);
	DO3.writeSync(GPIO26value); //turn physical GPIO26 pin on or off
	console.log('372 - Sending new DO3 / GPIO26 state to ALL clients');
	io.emit('GPIO26', GPIO26value); //send button status to ALL clients
	console.log('374 - Slide OUTPUT - DO3 / GPIO26 = '+GPIO26value);
	console.log('== == ==');
    });
    
    // this gets called whenever client presses DO4 / GPIO6 Toggle - slide button on the visualization.
    socket.on('GPIO6T', function(data) { 
	if (GPIO6value) GPIO6value = 0;
	else GPIO6value = 1;
	console.log('382 - DO4 Slide Button actuated - New GPIO6 value = '+GPIO6value);
	DO4.writeSync(GPIO6value); //turn physical GPIO6 pin on or off
	console.log('384 - Sending new DO4 - GPIO6 state to ALL clients');
	io.emit('GPIO6', GPIO6value); //send button status to ALL clients
	console.log('386 - Slide OUTPUT - DO4 / GPIO6 = '+GPIO6value);
	console.log('== == ==');
    });

    
    // this gets called whenever client presses DO1 / GPIO24 momentary button on the visualization.
    socket.on('GPIO24', function(data) {
	GPIO24value = data;
	if (GPIO24value != DO1.readSync()) { //only change GPIO24 output if status has changed
	    DO1.writeSync(GPIO24value); //turn physical GPIO24 pin on or off
	    console.log('396 - DO1 Momentary Pressed - Sending new GPIO24 state to ALL clients');
	    console.log('397 - Momentary OUTPUT - DO1 / GPIO24 value = '+GPIO24value);
	    io.emit('GPIO24', GPIO24value); //send button status to ALL clients
	    console.log('== == ==');
	};
	
    });
    
    // this gets called whenever client presses DO2 / GPIO25 momentary button on the visualization.
    socket.on('GPIO25', function(data) { 
	GPIO25value = data;
	if (GPIO25value != DO2.readSync()) { //only change GPIO25 output if status has changed
	    DO2.writeSync(GPIO25value); //turn physical GPIO25 pin on or off
	    console.log('409 - DO2 Momentary Pressed - Sending new GPIO25 state to ALL clients');
	    console.log('410 - Momentary OUTPUT - DO2 / GPIO245 value = '+GPIO25value);
	    io.emit('GPIO25', GPIO25value); //send button status to ALL clients 
	    console.log('== == ==');
	};

    });
    
    // this gets called whenever client presses DO3 / GPIO26 momentary button on the visualization.
    socket.on('GPIO26', function(data) { 
	GPIO26value = data;
	if (GPIO26value != DO3.readSync()) { //only change GPIO26 output if status has changed
	    DO3.writeSync(GPIO26value); //turn physical GPIO26 pin on or off
	    console.log('422 - DO3 Momentary Pressed - Sending new GPIO26 state to ALL clients');
	    console.log('423 - Momentary OUTPUT - DO3 / GPIO26 value = '+GPIO26value);
	    io.emit('GPIO26', GPIO26value); //send button status to ALL clients
	    console.log('== == ==');
	    };

    });
    
    // this gets called whenever client presses DO4 / GPIO6 momentary button on the visualization.
    socket.on('GPIO6', function(data) { 
	GPIO6value = data;
	if (GPIO6value != DO4.readSync()) { //only change GPIO6 output if status has changed
	    DO4.writeSync(GPIO6value); //turn physical GPIO6 pin on or off
	    console.log('435 - DO4 Momentary Pressed - Sending new GPIO6 state to ALL clients');
	    console.log('436 - Momentary OUTPUT - DO4 / GPIO6 value = '+GPIO6value);
	    io.emit('GPIO6', GPIO6value); //send button status to ALL clients
	    console.log('== == ==');
	    };

    });
 
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
    console.log('446 - A user disconnected');
    });
    
}); 
