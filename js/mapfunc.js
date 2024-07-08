let keys;

//function to submit api key and define map
function loadMap(key) { 
  (g => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
    b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f; a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a)
    }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
  })
    ({
      key: `${key.map}`,
      v: "weekly",
      // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
      // Add other bootstrap parameters as needed, using camel case.
    })
  initMap().then(function (AdvancedMarkerElement) {
    keys = key;
    (function () {
      /*
       geolocation-marker version 2.0.5
       @copyright 2012, 2015 Chad Killingsworth
       @see https://github.com/ChadKillingsworth/geolocation-marker/blob/master/LICENSE.txt
      */
      'use strict';
      var b; function e(a, c) { function f() { } f.prototype = c.prototype; a.B = c.prototype; a.prototype = new f; a.prototype.constructor = a; for (var g in c) if ("prototype" != g) if (Object.defineProperties) { var d = Object.getOwnPropertyDescriptor(c, g); d && Object.defineProperty(a, g, d) } else a[g] = c[g] }
      function h(a, c, f, g) {
        var d = google.maps.MVCObject.call(this) || this; d.c = null; d.b = null; d.a = null; d.i = -1; var l = { clickable: !1, cursor: "pointer", draggable: !1, flat: !0, icon: { path: google.maps.SymbolPath.CIRCLE, fillColor: "#a9f5aa", fillOpacity: .7, scale: 12, strokeWeight: 0 }, position: new google.maps.LatLng(0, 0), title: "Current location", zIndex: 2 }, m = {
          clickable: !1, cursor: "pointer", draggable: !1, flat: !0, icon: { path: google.maps.SymbolPath.CIRCLE, fillColor: "#25f528", fillOpacity: 1, scale: 6, strokeColor: "white", strokeWeight: 2 },
          optimized: !1, position: new google.maps.LatLng(0, 0), title: "Current location", zIndex: 3
        }; c && (l = k(l, c)); f && (m = k(m, f)); c = { clickable: !1, radius: 0, strokeColor: "10e613", strokeOpacity: .4, fillColor: "428743", fillOpacity: .4, strokeWeight: 1, zIndex: 1 }; g && (c = k(c, g)); d.c = new google.maps.Marker(l); d.b = new google.maps.Marker(m); d.a = new google.maps.Circle(c); google.maps.MVCObject.prototype.set.call(d, "accuracy", null); google.maps.MVCObject.prototype.set.call(d, "position", null); google.maps.MVCObject.prototype.set.call(d,
          "map", null); d.set("minimum_accuracy", null); d.set("position_options", { enableHighAccuracy: !0, maximumAge: 1E3 }); d.a.bindTo("map", d.c); d.a.bindTo("map", d.b); a && d.setMap(a); return d
      } e(h, google.maps.MVCObject); b = h.prototype; b.set = function (a, c) { if (n.test(a)) throw "'" + a + "' is a read-only property."; "map" === a ? this.setMap(c) : google.maps.MVCObject.prototype.set.call(this, a, c) }; b.f = function () { return this.get("map") }; b.l = function () { return this.get("position_options") };
      b.w = function (a) { this.set("position_options", a) }; b.g = function () { return this.get("position") }; b.m = function () { return this.get("position") ? this.a.getBounds() : null }; b.j = function () { return this.get("accuracy") }; b.h = function () { return this.get("minimum_accuracy") }; b.v = function (a) { this.set("minimum_accuracy", a) };
      b.setMap = function (a) { google.maps.MVCObject.prototype.set.call(this, "map", a); a ? navigator.geolocation && (this.i = navigator.geolocation.watchPosition(this.A.bind(this), this.o.bind(this), this.l())) : (this.c.unbind("position"), this.b.unbind("position"), this.a.unbind("center"), this.a.unbind("radius"), google.maps.MVCObject.prototype.set.call(this, "accuracy", null), google.maps.MVCObject.prototype.set.call(this, "position", null), navigator.geolocation.clearWatch(this.i), this.i = -1, this.c.setMap(a), this.b.setMap(a)) };
      b.u = function (a) { this.b.setOptions(k({}, a)) }; b.s = function (a) { this.a.setOptions(k({}, a)) };
      b.A = function (a) {
        var c = new google.maps.LatLng(a.coords.latitude, a.coords.longitude), f = !this.b.getMap(); if (f) { if (null != this.h() && a.coords.accuracy > this.h()) return; this.c.setMap(this.f()); this.b.setMap(this.f()); this.c.bindTo("position", this); this.b.bindTo("position", this); this.a.bindTo("center", this, "position"); this.a.bindTo("radius", this, "accuracy") } this.j() != a.coords.accuracy && google.maps.MVCObject.prototype.set.call(this, "accuracy", a.coords.accuracy); !f && this.g() && this.g().equals(c) || google.maps.MVCObject.prototype.set.call(this,
          "position", c)
      }; b.o = function (a) { google.maps.event.trigger(this, "geolocation_error", a) }; function k(a, c) { for (var f in c) !0 !== p[f] && (a[f] = c[f]); return a } var p = { map: !0, position: !0, radius: !0 }, n = /^(?:position|accuracy)$/i; var q = window; function r() { h.prototype.getAccuracy = h.prototype.j; h.prototype.getBounds = h.prototype.m; h.prototype.getMap = h.prototype.f; h.prototype.getMinimumAccuracy = h.prototype.h; h.prototype.getPosition = h.prototype.g; h.prototype.getPositionOptions = h.prototype.l; h.prototype.setCircleOptions = h.prototype.s; h.prototype.setMap = h.prototype.setMap; h.prototype.setMarkerOptions = h.prototype.u; h.prototype.setMinimumAccuracy = h.prototype.v; h.prototype.setPositionOptions = h.prototype.w; return h }
      "function" === typeof q.define && q.define.amd ? q.define([], r) : "object" === typeof q.exports ? q.module.exports = r() : q.GeolocationMarker = r();
    }).call(this)
    GeoMarker = new GeolocationMarker(map);
    centreOnUser();
    getCapturedStatus(keys).then(function (captures) {

      positionClueMarkers(AdvancedMarkerElement,captures);
    })
    follow();
  }
  );
}

function fullScreenToggle() {
  var elem = document.body;
  var button = document.getElementById("fullscreen-toggler");

  if (document.fullscreenElement) {
    //full screen mode is active so take us out of fullscreen    
    document.exitFullscreen();
    button.innerHTML = "fullscreen";
  }
  else {
    //fullscreen mode is not active so put us in fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      button.innerHTML = "fullscreen_exit";
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
      button.innerHTML = "fullscreen_exit";
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
      button.innerHTML = "fullscreen_exit";
    }
  }
}



//define the map variable
let map;
let GeoMarker;
let infoWindow;
let clueMarker;

let clues = {
  "1": {
    "lat": 51.455050,
    "lng": -0.960765,
    "clue": "When did we first produce biscuits?",
    "answer": 1814,
    "captured":"false",
    "points":10
  },
  "2": {
    "lat": 51.453957,
    "lng": -0.961984,
    "clue": "59 and ...",
    "answer": 75,
    "captured":"false",
    "points": 8
  },
  "3": {
    "lat": 51.453083,
    "lng": -0.969136,
    "clue": "First tram?",
    "answer": 1903,
    "captured":"false",
    "points": 7
  },
  "4": {
    "lat": 51.452515,
    "lng": -0.971589,
    "clue": "Bruce Tunnel - height above sea level?",
    "answer": 450,
    "captured":"false",
    "points": 6
  },
  "5": {
    "lat": 51.452623,
    "lng": -0.972350,
    "clue": "How many taxis stand here?",
    "answer": 3,
    "captured":"false",
    "points":6
  },
  "6": {
    "lat": 51.454097,
    "lng": -0.966383,
    "clue": "What year did Maureen Lockey open this?",
    "answer": 1990,
    "captured":"false",
    "points":4
  },
  "7": {
    "lat": 51.454171,
    "lng": -0.967394,
    "clue": "How many birds?",
    "answer": 8,
    "captured":"false",
    "points":4
  },
  "8": {
    "lat": 51.454675,
    "lng": -0.966327,
    "clue": "What year was this completed?",
    "answer": 2007,
    "captured":"false",
    "points":3
  },
  "9": {
    "lat": 51.455797,
    "lng": -0.966093,
    "clue": "When was Abbot Hugh executed?",
    "answer": 1539,
    "captured":"false",
    "points":3
  },
  "10": {
    "lat": 51.4565098732022,
    "lng": -0.976282147785361,
    "clue": "Middle of the black V (look carefully, this one's small!)?",
    "answer": 3,
    "captured":"false",
    "points":10
  },
  "11": {
    "lat": 51.456777,
    "lng": -0.974131,
    "clue": "How many bollards outside Siren?",
    "answer": 14,
    "captured":"false",
    "points":7
  },
  "12": {
    "lat": 51.454582,
    "lng": -0.977798,
    "clue": "Orange planters?",
    "answer": 9,
    "captured":"false",
    "points":8
  },
  "13": {
    "lat": 51.456053,
    "lng": -0.977058,
    "clue": "What location do you quote to 'save time'?",
    "answer": 9431,
    "captured":"false",
    "points":7
  },
  "14": {
    "lat": 51.453863,
    "lng": -0.977308,
    "clue": "How many sides?",
    "answer": 8,
    "captured":"false",
    "points":7
  },
  "15": {
    "lat": 51.45420432233849,
    "lng": -0.973830158038599,
    "clue": "How old was Peter Inman?",
    "answer": 76,
    "captured":"false",
    "points":6
  },
  "16": {
    "lat": 51.454002,
    "lng": -0.973724,
    "clue": "How many volts?",
    "answer": 240,
    "captured":"false",
    "points":7
  },
  "17": {
    "lat": 51.4548622442915,
    "lng": -0.9732989962959214,
    "clue": "When was Bill's drainpipe installed?",
    "answer": 1931,
    "captured":"false",
    "points":8
  },
  "18": {
    "lat": 51.456372,
    "lng": -0.967826,
    "clue": "When was the Abbey severely damaged?",
    "answer": 1643,
    "captured":"false",
    "points":1
  },
  "19": {
    "lat": 51.456969094260906,
    "lng": -0.9674520989827075,
    "clue": "How many captains?",
    "answer": 4,
    "captured":"false",
    "points":2
  },
  "20": {
    "lat": 51.45695789637502,
    "lng": -0.9682384625131224,
    "clue": "Romans were writing on the wall.",
    "answer": 20,
    "captured":"false",
    "points":3
  },
  "21": {
    "lat": 51.45786784843759,
    "lng": -0.9694736110905124,
    "clue": "You cannot miss this one!",
    "answer": 12,
    "captured":"false",
    "points":1
  },
  "22": {
    "lat": 51.45810805988329,
    "lng": -0.972069271328189,
    "clue": "Edward the ...",
    "answer": 7,
    "captured":"false",
    "points":4
  },
  "23": {
    "lat": 51.45663880429062,
    "lng": -0.9678497364696548,
    "clue": "When did John Speed make his map?",
    "answer": 1610,
    "captured":"false",
    "points":2
  },
  "24": {
    "lat": 51.45654731484567,
    "lng": -0.967196205486239,
    "clue": "What year was Frederick Potts in Gallipoli?",
    "answer": 1915,
    "captured":"false",
    "points":1
  },
  "25": {
    "lat": 51.45502978513994,
    "lng": -0.970030106107138,
    "clue": "George knows his Roman numerals...",
    "answer": 1506,
    "captured":"false",
    "points":5
  },
  "26": {
    "lat": 51.4566599803753,
    "lng": -0.97000077524566853,
    "clue": "Right circle minus left circle = ?",
    "answer": 57,
    "captured":"false",
    "points":3
  },
  "27": {
    "lat": 51.45684525008421,
    "lng": -0.9722219340620878,
    "clue": "Anno domini",
    "answer": 1902,
    "captured":"false",
    "points":3
  },
  "28": {
    "lat": 51.456710589169155,
    "lng": -0.9723428065772316,
    "clue": "When did they first start surveying, or auctioning?",
    "answer": 1882,
    "captured":"false",
    "points":4
  },
  "29": {
    "lat": 51.45669965202262,
    "lng": -0.9718587723006621,
    "clue": "666 maybe the number of the beast, what is the number of the dog?",
    "answer": 150,
    "captured":"false",
    "points":3
  },
  "30": {
    "lat": 51.45670984883732,
    "lng": -0.9719931584053527,
    "clue": "How many minutes to get to the Abbey Ruins?",
    "answer": 6,
    "captured":"false",
    "points":3
  },
  "31": {
    "lat": 51.45527591728553,
    "lng": -0.9707796488937782,
    "clue": "O, how many blue plaques above this?",
    "answer": 5,
    "captured":"false",
    "points":5
  },
  "32": {
    "lat": 51.45631791329671,
    "lng": -0.9695816750144369,
    "clue": "When was this 'clock' installed?",
    "answer": 1727,
    "captured":"false",
    "points":3
  },
  "33": {
    "lat":   51.45558870304998, 
    "lng": -0.9680066913345313,
    "clue": "Question 1 - what number to unlock our door?",
    "answer": 1289,
    "captured":"false",
    "points":0
  }
}



let clueMarkersKeys = Object.keys(clues);
let clueMarkers = [];
let clueMarkerTemp;

//load libraries
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  //set up map for first time
  //set initial position
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
    mapId: "32becf6749a12dee",
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    backgroundColor: "#3d55af"
  });

  //set marker
  /*
  userMarker = new AdvancedMarkerElement({
    title: 'Your Location',
    content: currentLocImg,
    map: map,
  });
*/
  infoWindow = new google.maps.InfoWindow();

  return AdvancedMarkerElement;

}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

function geoError() {
  console.log("Sorry, no position available.");
}

var geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};


function reloadMap() {
  location.reload();  
}

//centre the map on the user - run on load and on button push
function centreOnUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        //when the location is found hide the 'wait screen'
        let waitScreen = document.getElementsByClassName("waiting-screen")[0];
        waitScreen.style.display = "none";
        GeoMarker.position = pos;
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }, geoError, geoOptions
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//window.initMap = initMap;


function follow() {

  var win = function (position) {

    getCapturedStatus(keys).then(function (captures) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    for (i = 0; i < clueMarkers.length; i++) {
      let markerLat = clueMarkers[i].position.lat;
      let markerLng = clueMarkers[i].position.lng;
      console.log(captures[i+1])
      if(captures[i+1]!="active") {
        console.log(`marker ${i+1} has been captured `)
        
        clueMarkers[i].content.className = "marker-img";
        clueMarkers[i].content.src = "./icons/captured-"+captures[i+1]+".png";
    
      }
      else if (getDistanceBetween(markerLat, markerLng) == true) {
        clueMarkers[i].content.src = "./icons/clue-marker-active.png";
        clueMarkers[i].content.className = "clue-marker-img";
        clueMarkers[i].content.setAttribute("active", "true");
        clueMarkers[i].content.setAttribute("clue", clues[i+1].clue);
      }
      else {
        clueMarkers[i].content.src = "./icons/clue-marker.png";
        clueMarkers[i].content.className = "marker-img";
        console.log("Marker " + i + 1 + " out of range ")
      }
    }
  })
  };

  var watchID = navigator.geolocation.watchPosition(win);
}

//draw all the clue markers on the map and add listeners
function positionClueMarkers(AdvancedMarkerElement,capturedArray) {



  console.log(capturedArray);

  for (i = 1; i <= clueMarkersKeys.length; i++) {
    //define our active and inactive marker images
    const clueMarkerImg = document.createElement("img");
    clueMarkerImg.src = "./icons/clue-marker.png";
    clueMarkerImg.className = "marker-img";
    clueMarkerImg.id = `marker-${i}`;
    clueMarkerImg.setAttribute("active", "false");



    //create the marker
    let clueMarker = new AdvancedMarkerElement({
      title: 'Clue',
      map: map,
      gmpClickable: true,
      gmpDraggable: false
    });
    //add inactive marker properties
    clueMarker.title = `Location ${i}`;
    clueMarker.content = clueMarkerImg;
    clueMarker.content.setAttribute("active","false");
    clueMarker.content.setAttribute("clue","You need to move closer");
    clueMarker.content.setAttribute("location", i);
    if(capturedArray[i] =="active") {
      console.log("marker "+i+" is active")
      clueMarker.content.setAttribute("captured", "false");
    }
    else {
      console.log("marker "+i+" is captured "+capturedArray[i])

      clueMarker.content.setAttribute("captured", capturedArray[1]);
    }
    clueMarker.metadata = { id: i };
    clueMarker.position = {
      lat: clues[`${i}`].lat,
      lng: clues[`${i}`].lng
    }
    clueMarker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      let textDisplay = clueMarker.content.getAttribute("clue");
      if(clueMarker.content.getAttribute("captured")=="false") {
        if(clueMarker.content.getAttribute("active")=="true") {
          var myModal = new bootstrap.Modal(document.getElementById('answer-modal'), {})
          myModal.show();
          document.getElementById("question").style.color = "#00c100";
          document.getElementById("answer-input-section").style.display = "block";
        
          document.getElementById("answer-input").value = "";

          let location = clueMarker.content.getAttribute("location");
          document.getElementById("answer-modal").setAttribute("location",location);           
          document.getElementById("question").innerHTML = textDisplay;
        }
        else {
          infoWindow.setContent("You need to move closer.");
          infoWindow.open(clueMarker.map, clueMarker);
  
        }  
      }
    });

    clueMarkers.push(clueMarker);

  };

}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function getDistanceBetween(lat1, lon1) {
  var lat2 = GeoMarker.get("position").lat();
  var lon2 = GeoMarker.get("position").lng();
  var R = 6371000; // metres
  var φ1 = toRad(lat1);
  var φ2 = toRad(lat2);
  var Δφ = toRad(lat2 - lat1);
  var Δλ = toRad(lon2 - lon1);
  //alert("φ1 " + φ1 + "φ2 " + φ2)
  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;


  var clueRange = document.body.getAttribute("data-range");
  if (clueRange == undefined) { clueRange = 300; };
  if (d <= clueRange) {
    return true;
  }
  else {
    return false;
  }
}


function checkAnswer(answer,location) {
  if(answer == clues[`${location}`].answer) {
    checkStatus(keys,location,clueMarkers);
  }
  else {
    document.getElementById("question").innerHTML = "INCORRECT";  
    document.getElementById("question").style = "red";
    setTimeout(function() {
      document.getElementById("answer-input").value = "";
      document.getElementById("question").innerHTML = clues[`${location}`].clue;  
      document.getElementById("question").style = "#00c100";  
    })
  }
}

function failCapture(marker,captureText,captureTeam) {
  document.getElementById("question").style.color = "red";
  document.getElementById("answer-input-section").style.display = "none";
  document.getElementById("question").innerHTML = captureText;  
  clueMarkers[marker-1].content.src = "./icons/captured-"+captureTeam+".png";
}