// export function getAllData() {
//   fetch("http://localhost:3001/getAllData")
//     .then(res => res.json())
//     .then(
//       (result) => {
//         return result
//       });
// }

export function getFavs(dataWasRecieved) {
  fetch("http://localhost:3001/favorites")
    .then(res => res.json())
    .then(
      (result) => {
        dataWasRecieved(result)    
      });
}

export function removeFav(data) {
  fetch("http://localhost:3001/favorite/" + data, {
    method: 'delete'
  }).then(res => res.json())
}

export function addFav(data) {
  fetch("http://localhost:3001/favorite", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
}

export function addDrink(data) {
  fetch("http://localhost:3001/postDrink", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
}
