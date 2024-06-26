
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
const currentLocImg = document.createElement("img");
currentLocImg.src = "./icons/location.gif";
currentLocImg.className = "marker-img";


/*
    const clueMarkerActiveImg = document.createElement("img");
    clueMarkerActiveImg.src = "./icons/clue-marker-active.png";
    clueMarkerActiveImg.className = "clue-marker-img";
*/
//define the map variable
let map;
let userMarker;
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
  userMarker = new AdvancedMarkerElement({
    title: 'Your Location',
    content: currentLocImg,
    map: map,
  });

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
        userMarker.position = pos;
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
window.initMap = initMap;


function follow() {
  var win = function (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var myLatlng = new google.maps.LatLng(lat, long);
    userMarker.position = myLatlng;
    //marker.setMap(map);
    for (i = 1; i <= clueMarkersKeys.length; i++) {
      if (getDistanceBetween(clues[`${i}`].lat, clues[`${i}`].lng) == true) {
        console.log(`marker ${i} within scope`)
        const clueMarkerActiveImg = document.createElement("img");
        clueMarkerActiveImg.src = "./icons/clue-marker-active.png";
        clueMarkerActiveImg.className = "clue-marker-img";
        clueMarkers[i - 1].content = clueMarkerActiveImg;
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

    //create the marker
    let clueMarker = new AdvancedMarkerElement({
      title: 'Clue',
      map: map,
      gmpClickable: true,
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
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });

    console.log("creating marker " + i)
    clueMarkers.push(clueMarker);

  };

}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function getDistanceBetween(lat1, lon1) {
  var lat2 = userMarker.position.lat;
  var lon2 = userMarker.position.lng;

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
  if (clueRange == undefined) { clueRange = 20; };
  //var clueRange=20;
  console.log("clue range "+d)
  if (d <= clueRange) {
    return true;
  }
  else {
    return false;
  }
}

