let database;

function establishLink(keys) {
    const url = keys.site;
    const key = keys.supabase;
    database = supabase.createClient(url,key);
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

async function captureMarker(marker, team, clues) {
    let points = clues[`${marker}`].points;
    const { data, error } = await database
    .from('positions')
    .select('score')
    .eq("team",team);
    let score = data[0].score;
    score = score + points;


    const res = await database
        .from("clues")
        .update({status: team})
        .eq("id",marker);

 
    const updatedScore = await database
    .from("positions")
    .update({"score": score})
    .eq("team",team);


    clueMarkers[marker-1].content.setAttribute("captured",team);
    clueMarkers[marker-1].content.src = "./icons/captured-"+team+".png";
    clueMarkers[marker-1].content.className = "marker-img";
    $('#answer-modal').modal('hide');
}

async function checkStatus(marker,clueMarkers) {
    const { data, error } = await database
        .from('clues')
        .select('status')
        .eq('id',marker)

    if(data[0].status == "active") {
        let team = document.body.getAttribute("data-team");
        captureMarker(marker,team,clueMarkers);
    }
    else {
        let team = document.body.getAttribute("data-team");
        if(data[0].status == team) {
            captureText="Your team has already captured this data point."
        }
        else {
            captureText="Another team has captured this data point."

        }
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
