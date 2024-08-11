let database;



function establishMasterLink(keys) {
    const url = keys.site;
    const key = keys.supabase;
    database = supabase.createClient(url,key);
   
    const updateScores = database
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        table: 'positions',
        event: 'UPDATE',
        schema: 'public',
      },
      (payload) => {
        console.log(payload)
            let score = payload.new.score;
            let team = payload.new.team;
            let lat = payload.new.lat;
            let lng = payload.new.lng;
            console.log("in subscribe ",score,team)
            updateScoreBoxes(score,team);
            updateTeamPositions(team,lat,lng);
        }
    )
    .subscribe()

}

async function getScores() {
    const { data, error } = await database
    .from('positions')
    .select()
    for(let i = 0;i<data.length;i++) {
        let team = data[i].team;
        let score = data[i].score;
        document.getElementsByClassName(`${team}-score-total`)[0].innerHTML = score;

    }
    console.log(data);
}

async function locateTeams() {
    const res = await database
    .from("locate")
    .update({"locate_team":"true"})
    .eq("id",1);    
    console.log("setting locate teams")
    setTimeout(function() {
        resetLocateTeams();
    },2000)
}


async function resetlocateTeams() {
    const res = await database
    .from("locate")
    .update({"locate_team":"false"})
    .eq("id",1);    
    console.log("resetting location")
}

async function getCapturedStatus() {

    const res = await database.from("clues").select()
    
    let capturedArray = {};
    for(i=0;i<res.data.length;i++) {
      capturedArray[res.data[i].id] = res.data[i].status;
    }

    return capturedArray;
}

async function fireEndGame() {
    const res = await database
    .from("end_game")
    .update({"end_game":"true"})
    .eq("id",1);        
}