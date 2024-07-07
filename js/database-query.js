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

    clueMarkers[marker-1].content.setAttribute("captured")=team;
    clueMarkers[marker-1].content.src = "./icons/captured-"+team+".png";
}

async function checkStatus(keys,marker,clueMarkers) {

    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);

    const { data, error } = await database
        .from('clues')
        .select('status')
        .eq('id',marker)
    if(data[0].status == "active") {
        let team = document.body.getAttribute("team")
        captureMarker(keys,marker,team,clueMarkers);
    }
    else {
        failCapture(marker);
    }
}
