const h1 = document.querySelector('h1')
const p = document.querySelector('p')

fetch("http://api.country.is")
    .then((response) => response.json())
    .then((data) => {
        h1.innerHTML = `Adresse IP : ${data.ip}`
        p.innerHTML = `Pays: ${data.country}`
        console.log(data)
    })
    .catch((error) => console.log("erreur dans le fetch :" + error))



