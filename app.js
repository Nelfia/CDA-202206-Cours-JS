let reponse; 

fetch("http://api.learn.pierre-godino.com/api/toto")
.then((response) => response.text())
.then((data) => {
    const h1 =  document.querySelector('h1')
    h1.innerHTML = data
})
.catch((error) => console.log("erreur dans le fetch :" + error))


