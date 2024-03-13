'use-strict'

// Funktion zum Abrufen der aktuellen Uhrzeit
function getCurrentTime(offset) {
  var date = new Date();
  var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000 * offset));
  
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var currentDate = nd.toLocaleDateString(undefined, options);
  var currentTime = nd.toLocaleTimeString();

  return {
    date: currentDate,
    time: currentTime
  };
}

// Uhrzeit und Datum einmalig festlegen
var sanFranciscoTime = getCurrentTime(-7);
var denverTime = getCurrentTime(-6);
var dallasTime = getCurrentTime(-5);
var newYorkTime = getCurrentTime(-4);

document.getElementById('currentDate').textContent = denverTime.date;
document.getElementById('san-francisco-time').textContent = sanFranciscoTime.time;
document.getElementById('denver-time').textContent = denverTime.time;
document.getElementById('dallas-time').textContent = dallasTime.time;
document.getElementById('new-york-time').textContent = newYorkTime.time;

// Uhrzeiten alle 1 Sekunde aktualisieren
setInterval(function() {
  var currentTime = getCurrentTime(-7);
  document.getElementById('san-francisco-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-6);
  document.getElementById('denver-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-5);
  document.getElementById('dallas-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-4);
  document.getElementById('new-york-time').textContent = currentTime.time;
}, 1000);

// Funktion zum Abrufen der aktuellen Uhrzeit
function getCurrentTime(offset) {
    var date = new Date();
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate = nd.toLocaleDateString(undefined, options);
    var currentTime = nd.toLocaleTimeString();
  
    return {
      date: currentDate,
      time: currentTime
    };
  }
  
  // Uhrzeit und Datum einmalig festlegen
  var sanFranciscoTime = getCurrentTime(-7);
  var denverTime = getCurrentTime(-6);
  var dallasTime = getCurrentTime(-5);
  var newYorkTime = getCurrentTime(-4);
  
  document.getElementById('currentDate').textContent = denverTime.date;
  document.getElementById('san-francisco-time').textContent = sanFranciscoTime.time;
  document.getElementById('denver-time').textContent = denverTime.time;
  document.getElementById('dallas-time').textContent = dallasTime.time;
  document.getElementById('new-york-time').textContent = newYorkTime.time;
  
  // Uhrzeiten alle 1 Sekunde aktualisieren
  setInterval(function() {
    var currentTime = getCurrentTime(-7);
    document.getElementById('san-francisco-time').textContent = currentTime.time;
  }, 1000);
  
  setInterval(function() {
    var currentTime = getCurrentTime(-6);
    document.getElementById('denver-time').textContent = currentTime.time;
  }, 1000);
  
  setInterval(function() {
    var currentTime = getCurrentTime(-5);
    document.getElementById('dallas-time').textContent = currentTime.time;
  }, 1000);
  
  setInterval(function() {
    var currentTime = getCurrentTime(-4);
    document.getElementById('new-york-time').textContent = currentTime.time;
  }, 1000);
  
