fetch("http://api.learn.pierre-godino.com/api/myIP")
.then((response) => response.json())
.then((data) => {
    const h1 = document.querySelector('h1')
    h1.innerHTML = `
        Lattitude: ${data.location.lat}<br />
        Longitude: ${data.location.lon}
    `
    console.log(data.location.lat)
})
.catch((error) => console.log("erreur dans le fetch :" + error))



