
fetch('/.netlify/functions/request').then(response => {
  if (response.ok) {
    return response.text()
  } else {
    throw response.status
  }
}).then(data => {
  let keys = JSON.parse(data);
  loadMap(keys);
  establishLink(keys);
}).catch(error => {
  console.log("error ", error)
})