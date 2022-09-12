const body = document.querySelector('body')

const fetchData = () => {
    fetch('https://randomfox.ca/floof')
        .then((response) => response.json())
        .then((data) => {
            let nouvelleImg = document.createElement('img')
            nouvelleImg.src = data.image
            let lien = document.createElement('a')
            lien.href = data.link
            lien.appendChild(nouvelleImg)
            body.appendChild(lien)
        })
        .catch((error) => {throw error})
}

setInterval(fetchData, 1000)