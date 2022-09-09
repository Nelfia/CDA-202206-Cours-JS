const h1 = document.querySelector('h1')
const p = document.querySelector('p')

fetch("http://v2.jokeapi.dev/joke/Any")
    .then((response) => response.json())
    .then((data) => {
        if (data.type === "single") h1.innerHTML = data.joke
        else {
            h1.innerHTML = data.setup
            setTimeout(() => {
                p.innerHTML = data.delivery
            }, 1000)
        }
    })
    .catch((error) => console.log("erreur dans le fetch :" + error))



