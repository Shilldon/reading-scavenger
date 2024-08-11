let database;



function establishLink(keys) {
    const url = keys.site;
    const key = keys.supabase;
    database = supabase.createClient(url,key);
    const allChanges = database
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        table: 'clues',
        event: 'UPDATE',
        schema: 'public',
      },
      (payload) => {
        console.log("payload ",payload)
            markerID = payload.new.id;
            markerStatus = payload.new.status;
            updateMarker(markerID,markerStatus)
            displayMessage(markerStatus);
        }
    )
    .subscribe()
  
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayMessage(newStatus) {
    console.log("displaying")
    console.log(newStatus)
    let newStatusArray = newStatus.split(",");
    console.log(newStatusArray)
    let team = document.body.getAttribute("data-team");
    if(newStatusArray[1] == "none") {
        if(team!=newStatusArray[0]) {
            console.log("showing message")
            let message = document.getElementById("message");
            let messageBox = document.getElementsByClassName("message")[0];
            message.innerHTML = `${capitalizeFirstLetter(newStatusArray[0])} captured a datapoint`;
            messageBox.style.display = "flex";
            setTimeout(function() {
                messageBox.style.display = "none";
            },3500);
        }   
    }
}


async function updatePosition(team,lat,lng) {
    const res = await database
    .from("positions")
    .update({
        "lat": lat,
        "lng":lng
    })
    .eq("team",team);        
}

async function showTeamPositions() {
    const res = await database
    .from("positions")
    .select()

    return res.data;
}

async function captureMarker(marker, team, clues,position,captureOrder) {
    let points = clues[`${marker}`].points;
    const { data, error } = await database
    .from('positions')
    .select('score')
    .eq("team",team);
    let multiplier = 1;
    console.log("position ",position)
    switch(position) {
        case 1: multiplier=1.00; break;
        case 2: multiplier = 0.5; break;
        case 3: multiplier = 0.25; break;
    }
    let amendedPoints = points * multiplier;
    let award = Math.ceil(amendedPoints);
    let score = data[0].score;
    score = score + award;
    captureOrder[position-1] = team;
    console.log("capture order",captureOrder)
    let captureOrderString = captureOrder.toString();
    const res = await database
        .from("clues")
        .update({status: captureOrderString})
        .eq("id",marker);

 
    const updatedScore = await database
    .from("positions")
    .update({"score": score})
    .eq("team",team);

    let winningTeam = captureOrder[0];
    clueMarkers[marker-1].content.setAttribute("captured",winningTeam);
    clueMarkers[marker-1].content.src = "./icons/captured-"+winningTeam+".png";
    clueMarkers[marker-1].content.className = "marker-img";
    $('#answer-modal').modal('hide');
}

async function checkStatus(marker,clueMarkers) {
    const { data, error } = await database
        .from('clues')
        .select('status')
        .eq('id',marker)

    let captureOrder = data[0].status.split(",");
    let isNotNull = value => value != "none";
    console.log("capture order 1:-", captureOrder)
    let filteredArray = captureOrder.filter(isNotNull);
    let team = document.body.getAttribute("data-team");
    console.log("filter array ",filteredArray)
    console.log("capture order ",captureOrder)
    if(!captureOrder.includes(team)) {
        captureMarker(marker,team,clueMarkers,filteredArray.length+1,captureOrder);
    }
    else {
   //     let team = document.body.getAttribute("data-team");
   //     if(data[0].status == team) {
            captureText="Your team has already captured this data point."
   //     }
   //     else {
   //         captureText="Another team has captured this data point."
   //
   //      }
        failCapture(marker, captureText,data[0].status);
    }
}

async function getCapturedStatus() {

    const res = await database.from("clues").select()
    
    let capturedArray = {};
    for(i=0;i<res.data.length;i++) {
      capturedArray[res.data[i].id] = res.data[i].status;
    }

    return capturedArray;
}
