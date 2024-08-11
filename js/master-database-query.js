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