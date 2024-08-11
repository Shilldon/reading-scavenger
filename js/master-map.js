let keys;

//function to submit api key and define map
function loadMasterMap(key) {
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
    getCapturedStatus().then(function (captures) {
      let capturesKeys = Object.keys(captures);
      for (i = 0; i < capturesKeys.length; i++) {
        let captureOrder = captures[i + 1].split(",");
        clues[i + 1].captured = captureOrder;
      }
      positionClueMarkers(AdvancedMarkerElement);
      centreOnUser();
      setInterval(function () {
        updateMap();
      }, 250);
    })
  })
}


//define the map variable
let map;
let infoWindow;
let clueMarker;
let greenMarker;
let redMarker;
let yellowMarker;

let clues = {
  "1": {
    "lat": 51.4550936,
    "lng": -0.9609585,
    "clue": "When did we first produce biscuits?",
    "answer": 1814,
    "captured": ["none", "none", "none"],
    "points": 9
  },
  "2": {
    "lat": 51.453957,
    "lng": -0.961984,
    "clue": "59 and ...",
    "answer": 75,
    "captured": ["none", "none", "none"],
    "points": 9
  },
  "3": {
    "lat": 51.453083,
    "lng": -0.969136,
    "clue": "First tram?",
    "answer": 1903,
    "captured": ["none", "none", "none"],
    "points": 5
  },
  "4": {
    "lat": 51.452515,
    "lng": -0.971589,
    "clue": "Bruce Tunnel - height above sea level?",
    "answer": 450,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "5": {
    "lat": 51.452623,
    "lng": -0.972350,
    "clue": "How many taxis stand here?",
    "answer": 3,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "6": {
    "lat": 51.454097,
    "lng": -0.966383,
    "clue": "What year did Maureen Lockey open this?",
    "answer": 1990,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "7": {
    "lat": 51.454171,
    "lng": -0.967394,
    "clue": "How many ducks?",
    "answer": 4,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "8": {
    "lat": 51.454675,
    "lng": -0.966327,
    "clue": "What year was this completed?",
    "answer": 2007,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "9": {
    "lat": 51.455797,
    "lng": -0.966093,
    "clue": "When was Abbot Hugh executed?",
    "answer": 1539,
    "captured": ["none", "none", "none"],
    "points": 2
  },
  "10": {
    "lat": 51.4565098732022,
    "lng": -0.976282147785361,
    "clue": "Middle of the black V (look carefully, this one's small!)?",
    "answer": 3,
    "captured": ["none", "none", "none"],
    "points": 15
  },
  "11": {
    "lat": 51.456777,
    "lng": -0.974131,
    "clue": "How many bollards outside Siren?",
    "answer": 14,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "12": {
    "lat": 51.454582,
    "lng": -0.977798,
    "clue": "Orange planters?",
    "answer": 13,
    "captured": ["none", "none", "none"],
    "points": 13
  },
  "13": {
    "lat": 51.456053,
    "lng": -0.977058,
    "clue": "What location do you quote to 'save time'?",
    "answer": 9431,
    "captured": ["none", "none", "none"],
    "points": 12
  },
  "14": {
    "lat": 51.453863,
    "lng": -0.977308,
    "clue": "How many sides?",
    "answer": 8,
    "captured": ["none", "none", "none"],
    "points": 11
  },
  "15": {
    "lat": 51.45420432233849,
    "lng": -0.973830158038599,
    "clue": "How old was Peter Zinman?",
    "answer": 76,
    "captured": ["none", "none", "none"],
    "points": 10
  },
  "16": {
    "lat": 51.454002,
    "lng": -0.973724,
    "clue": "How many volts?",
    "answer": 230,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "17": {
    "lat": 51.4548622442915,
    "lng": -0.9732989962959214,
    "clue": "When was Bill's drainpipe installed?",
    "answer": 1931,
    "captured": ["none", "none", "none"],
    "points": 10
  },
  "18": {
    "lat": 51.456372,
    "lng": -0.967826,
    "clue": "When was the Abbey severely damaged?",
    "answer": 1643,
    "captured": ["none", "none", "none"],
    "points": 1
  },
  "19": {
    "lat": 51.456969094260906,
    "lng": -0.9674520989827075,
    "clue": "How many captains?",
    "answer": 4,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "20": {
    "lat": 51.45695789637502,
    "lng": -0.9682384625131224,
    "clue": "Romans were writing on the wall.",
    "answer": 20,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "21": {
    "lat": 51.45786784843759,
    "lng": -0.9694736110905124,
    "clue": "You cannot miss this one!",
    "answer": 12,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "22": {
    "lat": 51.45810805988329,
    "lng": -0.972069271328189,
    "clue": "Edward the ...",
    "answer": 7,
    "captured": ["none", "none", "none"],
    "points": 7
  },
  "23": {
    "lat": 51.45663880429062,
    "lng": -0.9678497364696548,
    "clue": "When did John Speed make his map?",
    "answer": 1610,
    "captured": ["none", "none", "none"],
    "points": 2
  },
  "24": {
    "lat": 51.45654731484567,
    "lng": -0.967196205486239,
    "clue": "What year was Frederick Potts in Gallipoli?",
    "answer": 1915,
    "captured": ["none", "none", "none"],
    "points": 2
  },
  "25": {
    "lat": 51.45502978513994,
    "lng": -0.970030106107138,
    "clue": "George knows his Roman numerals...",
    "answer": 1506,
    "captured": ["none", "none", "none"],
    "points": 4
  },
  "26": {
    "lat": 51.4566599803753,
    "lng": -0.97000077524566853,
    "clue": "Right circle minus left circle = ?",
    "answer": 57,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "27": {
    "lat": 51.45684525008421,
    "lng": -0.9722219340620878,
    "clue": "Anno domini",
    "answer": 1902,
    "captured": ["none", "none", "none"],
    "points": 6
  },
  "28": {
    "lat": 51.456710589169155,
    "lng": -0.9723428065772316,
    "clue": "When did they first start surveying, or auctioning?",
    "answer": 1882,
    "captured": ["none", "none", "none"],
    "points": 6
  },
  "29": {
    "lat": 51.45669965202262,
    "lng": -0.9718587723006621,
    "clue": "666 maybe the number of the beast, what is the number of the dog?",
    "answer": 150,
    "captured": ["none", "none", "none"],
    "points": 5
  },
  "30": {
    "lat": 51.45670984883732,
    "lng": -0.9719931584053527,
    "clue": "How many minutes to get to the Abbey Ruins?",
    "answer": 6,
    "captured": ["none", "none", "none"],
    "points": 6
  },
  "31": {
    "lat": 51.45527591728553,
    "lng": -0.9707796488937782,
    "clue": "O, how many blue plaques above this?",
    "answer": 5,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "32": {
    "lat": 51.45631791329671,
    "lng": -0.9695816750144369,
    "clue": "When was this 'clock' installed?",
    "answer": 1727,
    "captured": ["none", "none", "none"],
    "points": 2
  },
  "33": {
    "lat": 51.45558870304998,
    "lng": -0.9680066913345313,
    "clue": "Question 1 - what number to unlock our door?",
    "answer": 1289,
    "captured": ["none", "none", "none"],
    "points": 0
  },
  "34": {
    "lat": 51.454559,
    "lng": -0.9624617,
    "clue": "Date of the IDR bridge",
    "answer": 2261988,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "35": {
    "lat": 51.4543561,
    "lng": -0.9623777,
    "clue": "How many round windows?",
    "answer": 4,
    "captured": ["none", "none", "none"],
    "points": 8
  },
  "36": {
    "lat": 51.454178,
    "lng": -0.963985,
    "clue": "Reading Piece",
    "answer": 1982,
    "captured": ["none", "none", "none"],
    "points": 6
  },
  "37": {
    "lat": 51.4543398,
    "lng": -0.9664905,
    "clue": "How legs does this orange creature normally have?",
    "answer": 8,
    "captured": ["none", "none", "none"],
    "points": 3
  },
  "38": {
    "lat": 51.4547667,
    "lng": -0.964435,
    "clue": "What building is the swan flying into?",
    "answer": 100,
    "captured": ["none", "none", "none"],
    "points": 5
  },
  "39": {
    "lat": 51.455596,
    "lng": -0.966065,
    "clue": "Royal charter + town charter?",
    "answer": 2814,
    "captured": ["none", "none", "none"],
    "points": 2
  }
}



let clueMarkersKeys = Object.keys(clues);
let clueMarkers = [];
let clueMarkerTemp;
let markerDict = {};

//load libraries
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  //set up map for first time
  //set initial position
  map = new Map(document.getElementById("master-map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
    mapId: "32becf6749a12dee",
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    backgroundColor: "#3d55af"
  });

  //set marker

  let markerPosition = {
    lat: 51.45810805988329,
    lng: -0.972069271328189,
  }
  const greenMarkerImg = document.createElement("img");
  greenMarkerImg.src = "./icons/green-marker.png";
  greenMarkerImg.className = "clue-marker-img";

  let greenMarker = new AdvancedMarkerElement({
    title: 'Green Location',
    content: greenMarkerImg,
    map: map,
    gmpClickable: false
  });
  greenMarker.position = markerPosition;

  const redMarkerImg = document.createElement("img");
  redMarkerImg.src = "./icons/red-marker.png";
  redMarkerImg.className = "clue-marker-img";

  let redMarker = new AdvancedMarkerElement({
    title: 'Red Location',
    content: redMarkerImg,
    map: map,
    gmpClickable: false
  });
  redMarker.position = markerPosition;

  const yellowMarkerImg = document.createElement("img");
  yellowMarkerImg.src = "./icons/yellow-marker.png";
  yellowMarkerImg.className = "clue-marker-img";

  let yellowMarker = new AdvancedMarkerElement({
    title: 'Yellow Location',
    content: yellowMarkerImg,
    map: map,
    gmpClickable: false
  });
  yellowMarker.position = markerPosition;

  markerDict = {
    "green": greenMarker,
    "red": redMarker,
    "yellow": yellowMarker
  }

  infoWindow = new google.maps.InfoWindow();

  return AdvancedMarkerElement;

}


function centreOnUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        //when the location is found hide the 'wait screen'
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


function geoError() {
  console.log("Sorry, no position available.");
}

var geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

function updateMarker(markerID, markerStatus) {
  let markerStatusArray = markerStatus.split(",");
  clues[markerID].captured = markerStatusArray;
}


function updateTeamPositions() {
  showTeamPositions().then(function (data) {
    for (i = 0; i < data.length; i++) {
      let pos = {
        lat: data[i].lat,
        lng: data[i].lng
      }
      markerDict[data[i].team].position = pos;
    }
  })  
}


function updateMap() {
    //call spreadsheet to get positions of all teams
    for (i = 0; i < clueMarkers.length; i++) {
        
        let captureOrder = clues[i + 1].captured;
        if (captureOrder[0] != "none") {
          clueMarkers[i].content.className = "marker-img";
          clueMarkers[i].content.src = "./icons/captured-" + captureOrder[0] + ".png";

        }
      }
}

//draw all the clue markers on the map and add listeners
function positionClueMarkers(AdvancedMarkerElement) {

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
    clueMarker.content.setAttribute("active", "false");
    clueMarker.content.setAttribute("clue", "You need to move closer");
    clueMarker.content.setAttribute("location", i);

    //no need to change graphics on positioning markers - this will be done on calling "follow"
    clueMarker.metadata = { id: i };
    clueMarker.position = {
      lat: clues[`${i}`].lat,
      lng: clues[`${i}`].lng
    }
    clueMarker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      let textDisplay = clueMarker.content.getAttribute("clue");
      //if(clueMarker.content.getAttribute("captured")=="false") {
      if (clueMarker.content.getAttribute("active") == "true") {
        var myModal = new bootstrap.Modal(document.getElementById('answer-modal'), {})
        myModal.show();
        document.getElementById("question").style.color = "#00c100";
        document.getElementById("answer-input-section").style.display = "block";

        document.getElementById("answer-input").value = "";

        let location = clueMarker.content.getAttribute("location");
        document.getElementById("answer-modal").setAttribute("location", location);
        document.getElementById("question").innerHTML = textDisplay;
      }
      else {
        infoWindow.setContent("You need to move closer.");
        infoWindow.open(clueMarker.map, clueMarker);

      }
      //}
    });

    clueMarkers.push(clueMarker);

  };

}
