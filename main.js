


/************PROCESS DATA TO/FROM Client****************************/

	
var socket = io(); //load socket.io-client and connect to the HOST that serves the page

window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
//    alert('Mobile');  
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);
  }else{
//    alert('Desktop');  
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }
  
});


// == == ==

//Update gpio feedback when server changes DI1/GPIO16 state
socket.on('DI1_GPIO16value', function (data) {  
  console.log('main.28 - socket.on ==> DI1_GPIO16value function called');
  console.log(data);
  var myJSON = JSON.stringify(data);
console.log('DI1 / GPIO16 JSON = ' +myJSON);
  document.getElementById('DI1_GPIO16value').checked = data;
  console.log('main.33 - DI1_GPIO16balue: '+data.toString());
});

// == == ==


//Update gpio feedback when server changes DO1/GPIO24 state
socket.on('GPIO24', function (data) {  
  console.log('main.27 - socket.on ==> GPIO24 function called');
  console.log(data);
  var myJSON = JSON.stringify(data);
console.log('DO1 / GPIO24 JSON = ' +myJSON);
  document.getElementById('GPIO24').checked = data;
  console.log('GPIO24: '+data.toString());
});


//Update gpio feedback when server changes DO2/GPIO25 state
socket.on('GPIO25', function (data) {  
//  console.log('main.38 - socket.on ==> GPIO25 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO25').checked = data;
//  console.log('GPIO25: '+data.toString());
});



//Update gpio feedback when server changes DO3/GPIO26 state
socket.on('GPIO26', function (data) {  
//  console.log('main.50 - socket.on ==> GPIO26 function called');
 // console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO26').checked = data;
// console.log('GPIO26: '+data.toString());
});



//Update gpio feedback when server changes DO4/GPIO6 state
socket.on('GPIO6', function (data) {  
//  console.log('main.62 - socket.on ==> GPIO6 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('GPIO6').checked = data;
//  console.log('GPIO6: '+data.toString());
});


function ReportTouchStart(e) {
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "GPIO24") {
 //     console.log("GPIO24 toggle");
      socket.emit("GPIO24T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO25") {
 //     console.log("GPIO25 toggle");
      socket.emit("GPIO25T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO26") {
//      console.log("GPIO26 toggle");
      socket.emit("GPIO26T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO6") {
  //    console.log("GPIO6 toggle");
      socket.emit("GPIO6T");  // send GPIO button toggle to node.js server
    } 
  }

  if (e.target.id === "GPIO24Momentary") {
  //   console.log("GPIO24 Momntary pressed");
    socket.emit("GPIO24", 1); 
    document.getElementById('GPIO24').checked = 1;
  } else if (e.target.id === "GPIO25Momentary") {
 //   console.log("GPIO25 Momentary pressed");
    socket.emit("GPIO25", 1); 
    document.getElementById('GPIO25').checked = 1;
  } else if (e.target.id === "GPIO26Momentary") {
  //  console.log("GPIO26 Momentary pressed");
    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  } else if (e.target.id === "GPIO6Momentary") {
//    console.log("GPIO6 Momentary pressed");
    socket.emit("GPIO6", 1); 
    document.getElementById('GPIO6').checked = 1;
  }
}

function ReportTouchEnd(e) {
  if (e.target.id === "GPIO24Momentary") {
    socket.emit("GPIO24", 0); 
    document.getElementById('GPIO24').checked = 0;
  } else if (e.target.id === "GPIO25Momentary") {
    socket.emit("GPIO25", 0); 
    document.getElementById('GPIO25').checked = 0;
  } else if (e.target.id === "GPIO26Momentary") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  } else if (e.target.id === "GPIO6Momentary") {
    socket.emit("GPIO6", 0); 
    document.getElementById('GPIO6').checked = 0;
  }
}

function ReportMouseDown(e) {
  
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "GPIO24") {
 //     console.log("GPIO24 toggle");
      socket.emit("GPIO24T");  // send DO1 / GPIO24 slide toggle button to node.js server
    } else if (x === "GPIO25") {
//     console.log("GPIO25 toggle");
      socket.emit("GPIO25T");  // send DO2 / GPIO25 slide toggle button to node.js server
    } else if (x === "GPIO26") {
 //     console.log("GPIO26 toggle");
      socket.emit("GPIO26T");  // send DO3 / GPIO26 slide toggle button to node.js server
    } else if (x === "GPIO6") {
 //     console.log("GPIO6 toggle");
      socket.emit("GPIO6T");  // send DO4 / GPIO6 slide toggle button to node.js server
    } 
  }
  
  if (e.target.id === "GPIO24Momentary") {
 //   console.log("GPIO24 pressed");
    socket.emit("GPIO24", 1); 
    document.getElementById('GPIO24').checked = 1;
  } else if (e.target.id === "GPIO25Momentary") {
//    console.log("GPIO25 pressed");
    socket.emit("GPIO25", 1); 
    document.getElementById('GPIO25').checked = 1;
  } else if (e.target.id === "GPIO26Momentary") {
//    console.log("GPIO26 pressed");
    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  } else if (e.target.id === "GPIO6Momentary") {
//    console.log("GPIO6 pressed");
    socket.emit("GPIO6", 1); 
  }
}


function ReportMouseUp(e) {
  if (e.target.id === "GPIO24Momentary") {
    socket.emit("GPIO24", 0); 
    document.getElementById('GPIO24').checked = 0;
  } else if (e.target.id === "GPIO25Momentary") {
    socket.emit("GPIO25", 0); 
    document.getElementById('GPIO25').checked = 0;
  } else if (e.target.id === "GPIO26Momentary") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  } else if (e.target.id === "GPIO6Momentary") {
    socket.emit("GPIO6", 0); 
    document.getElementById('GPIO6').checked = 0;
  }
}

function TouchMove(e) {

}



/** function to sense if device is a mobile device ***/
// Reference: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


