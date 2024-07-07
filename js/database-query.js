async function databaseQuery(keys) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);
    console.log(database);

    const res = await database.from("clues").insert({
        id: 2,
        status: "This is another clue"
    })

    console.log(res);
}

async function captureMarker(keys, marker, team, clueMarkers) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);


    const res = await database
        .from("clues")
        .update({status: team})
        .eq("id",marker);

    clueMarkers[marker-1].content.setAttribute("captured",team);
    clueMarkers[marker-1].content.src = "./icons/captured-"+team+".png";
    clueMarkers[marker-1].content.className = "marker-img";
    $('#answer-modal').modal('hide');
}

async function checkStatus(keys,marker,clueMarkers) {

    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);

    const { data, error } = await database
        .from('clues')
        .select('status')
        .eq('id',marker)
        console.log(data)
    if(data[0].status == "active") {
        let team = document.body.getAttribute("data-team");
        console.log("team is "+team)
        captureMarker(keys,marker,team,clueMarkers);
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
async function getCapturedStatus(keys) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);
    const res = await database.from("clues").select()
    
    let capturedArray = {};
    for(i=0;i<res.data.length;i++) {
      console.log("captured - "+res.data[i].id+" is "+res.data[i].status)
      capturedArray[res.data[i].id] = res.data[i].status;
    }

    return capturedArray;
}
