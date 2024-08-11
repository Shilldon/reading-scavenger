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
            console.log(payload)
            updateScoreBoxes(endStatus)
        }
    )
    .subscribe()

}

async function getCapturedStatus() {

    const res = await database.from("clues").select()
    
    let capturedArray = {};
    for(i=0;i<res.data.length;i++) {
      capturedArray[res.data[i].id] = res.data[i].status;
    }

    return capturedArray;
}