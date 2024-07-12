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

      positionClueMarkers(AdvancedMarkerElement, captures);
    })
    updateMap();
  }
  );
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
    "lat": 51.455050,
    "lng": -0.960765,
    "clue": "When did we first produce biscuits?",
    "answer": 1814,
    "captured": "false",
    "points": 10
  },
  "2": {
    "lat": 51.453957,
    "lng": -0.961984,
    "clue": "59 and ...",
    "answer": 75,
    "captured": "false",
    "points": 8
  },
  "3": {
    "lat": 51.453083,
    "lng": -0.969136,
    "clue": "First tram?",
    "answer": 1903,
    "captured": "false",
    "points": 7
  },
  "4": {
    "lat": 51.452515,
    "lng": -0.971589,
    "clue": "Bruce Tunnel - height above sea level?",
    "answer": 450,
    "captured": "false",
    "points": 6
  },
  "5": {
    "lat": 51.452623,
    "lng": -0.972350,
    "clue": "How many taxis stand here?",
    "answer": 3,
    "captured": "false",
    "points": 6
  },
  "6": {
    "lat": 51.454097,
    "lng": -0.966383,
    "clue": "What year did Maureen Lockey open this?",
    "answer": 1990,
    "captured": "false",
    "points": 4
  },
  "7": {
    "lat": 51.454171,
    "lng": -0.967394,
    "clue": "How many birds?",
    "answer": 8,
    "captured": "false",
    "points": 4
  },
  "8": {
    "lat": 51.454675,
    "lng": -0.966327,
    "clue": "What year was this completed?",
    "answer": 2007,
    "captured": "false",
    "points": 3
  },
  "9": {
    "lat": 51.455797,
    "lng": -0.966093,
    "clue": "When was Abbot Hugh executed?",
    "answer": 1539,
    "captured": "false",
    "points": 3
  },
  "10": {
    "lat": 51.4565098732022,
    "lng": -0.976282147785361,
    "clue": "Middle of the black V (look carefully, this one's small!)?",
    "answer": 3,
    "captured": "false",
    "points": 10
  },
  "11": {
    "lat": 51.456777,
    "lng": -0.974131,
    "clue": "How many bollards outside Siren?",
    "answer": 14,
    "captured": "false",
    "points": 7
  },
  "12": {
    "lat": 51.454582,
    "lng": -0.977798,
    "clue": "Orange planters?",
    "answer": 9,
    "captured": "false",
    "points": 8
  },
  "13": {
    "lat": 51.456053,
    "lng": -0.977058,
    "clue": "What location do you quote to 'save time'?",
    "answer": 9431,
    "captured": "false",
    "points": 7
  },
  "14": {
    "lat": 51.453863,
    "lng": -0.977308,
    "clue": "How many sides?",
    "answer": 8,
    "captured": "false",
    "points": 7
  },
  "15": {
    "lat": 51.45420432233849,
    "lng": -0.973830158038599,
    "clue": "How old was Peter Inman?",
    "answer": 76,
    "captured": "false",
    "points": 6
  },
  "16": {
    "lat": 51.454002,
    "lng": -0.973724,
    "clue": "How many volts?",
    "answer": 240,
    "captured": "false",
    "points": 7
  },
  "17": {
    "lat": 51.4548622442915,
    "lng": -0.9732989962959214,
    "clue": "When was Bill's drainpipe installed?",
    "answer": 1931,
    "captured": "false",
    "points": 8
  },
  "18": {
    "lat": 51.456372,
    "lng": -0.967826,
    "clue": "When was the Abbey severely damaged?",
    "answer": 1643,
    "captured": "false",
    "points": 1
  },
  "19": {
    "lat": 51.456969094260906,
    "lng": -0.9674520989827075,
    "clue": "How many captains?",
    "answer": 4,
    "captured": "false",
    "points": 2
  },
  "20": {
    "lat": 51.45695789637502,
    "lng": -0.9682384625131224,
    "clue": "Romans were writing on the wall.",
    "answer": 20,
    "captured": "false",
    "points": 3
  },
  "21": {
    "lat": 51.45786784843759,
    "lng": -0.9694736110905124,
    "clue": "You cannot miss this one!",
    "answer": 12,
    "captured": "false",
    "points": 1
  },
  "22": {
    "lat": 51.45810805988329,
    "lng": -0.972069271328189,
    "clue": "Edward the ...",
    "answer": 7,
    "captured": "false",
    "points": 4
  },
  "23": {
    "lat": 51.45663880429062,
    "lng": -0.9678497364696548,
    "clue": "When did John Speed make his map?",
    "answer": 1610,
    "captured": "false",
    "points": 2
  },
  "24": {
    "lat": 51.45654731484567,
    "lng": -0.967196205486239,
    "clue": "What year was Frederick Potts in Gallipoli?",
    "answer": 1915,
    "captured": "false",
    "points": 1
  },
  "25": {
    "lat": 51.45502978513994,
    "lng": -0.970030106107138,
    "clue": "George knows his Roman numerals...",
    "answer": 1506,
    "captured": "false",
    "points": 5
  },
  "26": {
    "lat": 51.4566599803753,
    "lng": -0.97000077524566853,
    "clue": "Right circle minus left circle = ?",
    "answer": 57,
    "captured": "false",
    "points": 3
  },
  "27": {
    "lat": 51.45684525008421,
    "lng": -0.9722219340620878,
    "clue": "Anno domini",
    "answer": 1902,
    "captured": "false",
    "points": 3
  },
  "28": {
    "lat": 51.456710589169155,
    "lng": -0.9723428065772316,
    "clue": "When did they first start surveying, or auctioning?",
    "answer": 1882,
    "captured": "false",
    "points": 4
  },
  "29": {
    "lat": 51.45669965202262,
    "lng": -0.9718587723006621,
    "clue": "666 maybe the number of the beast, what is the number of the dog?",
    "answer": 150,
    "captured": "false",
    "points": 3
  },
  "30": {
    "lat": 51.45670984883732,
    "lng": -0.9719931584053527,
    "clue": "How many minutes to get to the Abbey Ruins?",
    "answer": 6,
    "captured": "false",
    "points": 3
  },
  "31": {
    "lat": 51.45527591728553,
    "lng": -0.9707796488937782,
    "clue": "O, how many blue plaques above this?",
    "answer": 5,
    "captured": "false",
    "points": 5
  },
  "32": {
    "lat": 51.45631791329671,
    "lng": -0.9695816750144369,
    "clue": "When was this 'clock' installed?",
    "answer": 1727,
    "captured": "false",
    "points": 3
  },
  "33": {
    "lat": 51.45558870304998,
    "lng": -0.9680066913345313,
    "clue": "Question 1 - what number to unlock our door?",
    "answer": 1289,
    "captured": "false",
    "points": 0
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


//window.initMap = initMap;


function updateMap() {
  setTimeout(function () {
    //call spreadsheet to get positions of all teams
    showTeamPositions().then(function (data) {
      for (i = 0; i < data.length; i++) {
        markerDict[data[i].team].position = pos;
      }
    })
    getCapturedStatus().then(function (captures) {

      for (i = 0; i < clueMarkers.length; i++) {
        if (captures[i + 1] != "active") {
          console.log(`marker ${i + 1} has been captured `)
          clueMarkers[i].content.className = "marker-img";
          clueMarkers[i].content.src = "./icons/captured-" + captures[i + 1] + ".png";
        }
      }
    })
    //update status of all markers
  }, 1000)

}

//draw all the clue markers on the map and add listeners
function positionClueMarkers(AdvancedMarkerElement, capturedArray) {

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
    clueMarker.content.setAttribute("active", "false");
    clueMarker.content.setAttribute("clue", "You need to move closer");
    clueMarker.content.setAttribute("location", i);
    if (capturedArray[i] == "active") {
      console.log("marker " + i + " is active")
      clueMarker.content.setAttribute("captured", "false");
    }
    else {
      console.log("marker " + i + " is captured " + capturedArray[i])

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
      if (clueMarker.content.getAttribute("captured") == "false") {
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
      }
    });

    clueMarkers.push(clueMarker);

  };

}
