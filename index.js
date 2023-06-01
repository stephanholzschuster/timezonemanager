'use strict';

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
var sanFranciscoTime = getCurrentTime(-8);
var denverTime = getCurrentTime(-7);
var dallasTime = getCurrentTime(-6);
var newYorkTime = getCurrentTime(-5);

document.getElementById('currentDate').textContent = denverTime.date;
document.getElementById('san-francisco-time').textContent = sanFranciscoTime.time;
document.getElementById('denver-time').textContent = denverTime.time;
document.getElementById('dallas-time').textContent = dallasTime.time;
document.getElementById('new-york-time').textContent = newYorkTime.time;

// Uhrzeiten alle 1 Sekunde aktualisieren
setInterval(function() {
  var currentTime = getCurrentTime(-8);
  document.getElementById('san-francisco-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-7);
  document.getElementById('denver-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-6);
  document.getElementById('dallas-time').textContent = currentTime.time;
}, 1000);

setInterval(function() {
  var currentTime = getCurrentTime(-5);
  document.getElementById('new-york-time').textContent = currentTime.time;
}, 1000);

    // Karte anzeigen
let map = L.map('map', {
  center: [37.8, -96],
  zoom: 4
})

// Hinzufügen der Kartenlayer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
