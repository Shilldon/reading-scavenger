function loadMap(key) {
    (g => {
        var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;
        b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{
            await (a=m.createElement("script"));
            e.set("libraries",[...r]+"");
            for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);
            e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;
            d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));
            a.nonce=m.querySelector("script[nonce]")?.nonce||"";
            m.head.append(a)}));
            d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
            ({
                key: `${key}`,
                v: "weekly",
                // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
                // Add other bootstrap parameters as needed, using camel case.
            })
    initMap();
}

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 20,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
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
  });
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

window.initMap = initMap;


window.lat = 37.7850;
window.lng = -122.4383;
function getLocation() {
  console.log("getting location")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
    return null;
};
function updatePosition(position) {
  console.log("updating position")
  if (position) {
    window.lat = position.coords.latitude;
    window.lng = position.coords.longitude;
  }
}
setInterval(function(){updatePosition(getLocation());}, 1000);
function currentLocation() {
  console.log("finding current position")
  return {lat:window.lat, lng:window.lng};
};
