//import the marker data from the local csv
function getMarkerInfo() {
  var data;
  $.ajax({
    type: "GET",
    url: "assets/data/marker-data.csv",
    dataType: "text",
    success: function(response) {
      data = $.csv.toArrays(response);
      generateMarkers(data);
    }
  });
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, marker, myLatlng;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6,
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


var geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

function geoError() {
  console.log("Sorry, no position available.");
}

function centre() {
  navigator.geolocation.getCurrentPosition(function(position) {
    myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }, geoError, geoOptions);
}

function follow() {
  var win = function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var iconimage = {
      url: 'assets/images/user-position.png',
      size: new google.maps.Size(384, 720),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(0, 0)
      //anchor: new google.maps.Point(17, 34),
//      scaledSize: new google.maps.Size(20, 27)
    };
    var myLatlng = new google.maps.LatLng(lat, long);
    $(document).attr('lat',lat);
    $(document).attr('lon',long);
    if (marker) {
      marker.setMap(null);

    }
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: iconimage
    });


    marker.setMap(map);
  };

  var watchID = navigator.geolocation.watchPosition(win);
}

function getData() {
  var data;
  $.ajax({
    type: "GET",
    url: "assets/data/markers.csv",
    dataType: "text",
    success: function(response) {
      var rows = response.split(/\n/);
      for (i = 1; i < rows.length; i++) {
        markerInfo = [];

        // For every row - split it into columns
        var columns = rows[i].split(/,/);
        for (var colIndex in columns) {
          var colValue = columns[colIndex].trim();
          // here you have the colValue to play with
          markerInfo.push(colValue);
        }
        drawMarker(markerInfo);
      }
    }
  });
}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function getDistanceBetween(lat1, lon1, lat2, lon2) {

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


  var clueRange = $(document).attr("Range");
  if (clueRange == undefined) { clueRange = 20; };
  //var clueRange=20;
  /*
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text("distance=" + d + " Clue range=" + clueRange);
*/
  if (d <= 200) {
    return true;
  }
  else {
    return false;
  }
}

var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};


var previousInfoWindow = false;

function drawIMMarker() {
    //put on IM marker
  var imPosition = new google.maps.LatLng(51.405800, -1.323665); 
  var marker=new google.maps.Marker({
      position: imPosition,
    icon: {
      url: 'assets/images/im-pin.png',
      scaledSize:new google.maps.Size(100,60)
    }
  });
  marker.setMap(map);
}

function drawMarker(markerInfo) {

  //put on clue markers
  
  
  var markerPosition = new google.maps.LatLng(markerInfo[1], markerInfo[2]);
  //add data to marker
  var marker = new google.maps.Marker({
    position: markerPosition,
    title: 'Clue',
    icon: {
      url: 'assets/images/clue-position-flag-inactive-large.png',
      scaledSize: new google.maps.Size(50, 50)
    },
    question: markerInfo[0],
    active: false
  });

  var lat2, lon2;
  
    marker.addListener('click', function() {
    //check if previous infowindow is open and, if so, close it
    lon2=$(document).attr('lon');
    lat2=$(document).attr('lat');
    $('#click-sound')[0].play();
    marker.setIcon({ url: 'assets/images/clue-position-flag-inactive-large-select.gif', scaledSize: new google.maps.Size(50, 50) })
      if (getDistanceBetween(markerInfo[1], markerInfo[2], lat2, lon2) == true || marker.active==true) {
        infoContent = "<div><p>Clue</p><p>" + marker.question + "</p></div>"
        setTimeout(function () {marker.setIcon({
          url: 'assets/images/clue-position-flag-active-large.png',
          scaledSize: new google.maps.Size(50, 50)
        })},800)
        marker.active=true;
      }
      else {
        setTimeout(function () {marker.setIcon({
          url: 'assets/images/clue-position-flag-inactive-large.png',
          scaledSize: new google.maps.Size(50, 50)
        })},900)          
        infoContent = "<div><p>You need to move closer.</p></div>";
      }
      showInfo(infoContent, marker);

  });

  marker.setMap(map);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function showInfo(infoContent, marker) {
  var infowindow = new google.maps.InfoWindow({
    content: infoContent,

  });

  if (previousInfoWindow) {
    previousInfoWindow.close();
  }
  previousInfoWindow = infowindow;
  infowindow.open(map, marker);
  if(marker.active==false) {
      setTimeout(function() { infowindow.close() },2500);
  }
}
