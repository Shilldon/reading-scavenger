
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
  initMap();
}

//set up map markers
const currentLocImg = document.createElement("img");
currentLocImg.src = "./icons/location.gif";
currentLocImg.className = "current-location-img";


//define the map variable
let map;
let marker;
let clues = {
  "1" : {
    "lat":51.448272, 
    "lng": -1.009108,
    "clue":"Some wording"
  },
  "2" : {
    "lat":51.458272, 
    "lng": -1.059108,
    "clue":"Some wording too"
  }

}
//set up map for first time
async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  //set initial position
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    mapId: "32becf6749a12dee"
  });


  //add clue markers
  let clueMarkers = Object.keys(clues);
  let clueMarker;
  console.log("adding clue markers")
  for(i=1;i<=clueMarkers.length; i++) {
    console.log("adding clue marker "+i)

    const clueMarkerImg = document.createElement("img");
    clueMarkerImg.src = "./icons/clue-marker.png";
    clueMarkerImg.className = "current-location-img";

    console.log(clues[`${i}`].lat)
    console.log(JSON.stringify(clues[`${i}`]))
    clueMarker = new AdvancedMarkerElement({
      title: `Location `,
      content: clueMarkerImg,
      position: {
        lat: clues[`${i}`].lat,
        lng: clues[`${i}`].lng
      },
      map: map
    });
  }  


  centreOnUser();
  //set marker
  marker = new AdvancedMarkerElement({
    title: 'Your Location',
    content: currentLocImg,
    map: map
  });


  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    centreOnUser();
  })

  

  //start updating user location
  updateLocation();



  //handle user location
  //  infoWindow = new google.maps.InfoWindow();
  /*
    const locationButton = document.createElement("button");
  
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  
    locationButton.addEventListener("click", () => {*/
  // Try HTML5 geolocation.
  //  });
}




//function to update the user's location every second
function updateLocation() {
  console.log("update location")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        marker.position = pos;
     //   console.log("lat "+pos.lat+" lng "+pos.lng)
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      },
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  setTimeout(function () {
    updateLocation();
  }, 250)
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



function centreOnUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      },
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
window.initMap = initMap;



