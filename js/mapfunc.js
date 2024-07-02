
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
      key: `${key}`,
      v: "weekly",
      // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
      // Add other bootstrap parameters as needed, using camel case.
    })
  initMap().then(function (AdvancedMarkerElement) {

    (function(){
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
    follow();
    positionClueMarkers(AdvancedMarkerElement);
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


//set up map markers
/*
const currentLocImg = document.createElement("img");
currentLocImg.src = "./icons/location.gif";
currentLocImg.className = "marker-img";
*/

//define the map variable
let map;
let GeoMarker;
//let userMarker;
let infoWindow;
let clueMarker;
let clues = {
  "1": {
    "lat": 51.448272,
    "lng": -1.009108,
    "clue": "Some wording"
  },
  "2": {
    "lat": 51.458272,
    "lng": -1.059108,
    "clue": "Some wording too"
  },
  "3": {
    "lat": 51.410609,
    "lng": -1.316207,
    "clue": "More wording"
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
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    for (i = 1; i <= clueMarkersKeys.length; i++) {
      if (getDistanceBetween(clues[`${i}`].lat, clues[`${i}`].lng) == true) {
        if(clueMarkers[i - 1].content.active == false) {

        console.log(`marker ${i} within scope`)
        /*
        const clueMarkerActiveImg = document.createElement("img");
        clueMarkerActiveImg.src = "./icons/clue-marker-active.png";
        clueMarkerActiveImg.className = "clue-marker-img";
        clueMarkerActiveImg.setAttribute("active",true);*/
        clueMarkers[i - 1].content.setAttribute("active",true);
        clueMarkers[i - 1].content.src = "./icons/clue-marker-active.png";
        clueMarkers[i - 1].content.className - "clue-marker-img";
        clueMarkers[i - 1].gmpClickable = true;
        clueMarkers[i - 1].content = clueMarkerActiveImg;
      }
    }
      else {
        console.log(`marker ${i} outside scope`)
      }
    }
  };

  var watchID = navigator.geolocation.watchPosition(win);
}

//draw all the clue markers on the map and add listeners
function positionClueMarkers(AdvancedMarkerElement) {

  for (i = 1; i <= clueMarkersKeys.length; i++) {
    //define our active and inactive marker images
    const clueMarkerImg = document.createElement("img");
    clueMarkerImg.src = "./icons/clue-marker.png";
    clueMarkerImg.className = "marker-img";
    clueMarkerImg.setAttribute("active",false);

    //create the marker
    let clueMarker = new AdvancedMarkerElement({
      title: 'Clue',
      map: map,
      gmpClickable: false
    });
    //add inactive marker properties
    clueMarker.title = `Location ${i}`;
    clueMarker.content = clueMarkerImg;
    clueMarker.position = {
      lat: clues[`${i}`].lat,
      lng: clues[`${i}`].lng
    }
    clueMarker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
    
      infoWindow.close();
      infoWindow.setContent(clueMarker.title);
      infoWindow.open(clueMarker.map, clueMarker);
    });

    console.log("creating marker " + i)
    clueMarkers.push(clueMarker);

  };

}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function getDistanceBetween(lat1, lon1) {
  console.log(GeoMarker)
  var lat2 = GeoMarker.get("position").lat();
  var lon2 = GeoMarker.get("position").lng();

console.log(`lat1 ${lat1} lat2 ${lat2} lon1 ${lon1} lon2 ${lon2}`)

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


  var clueRange;// = $(document).attr("Range");
  if (clueRange == undefined) { clueRange = 300; };
  //var clueRange=20;
  console.log("clue range "+d)
  if (d <= clueRange) {
    return true;
  }
  else {
    return false;
  }
}

