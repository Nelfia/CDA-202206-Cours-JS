const ul = document.querySelector('ul')

fetch('http://api.open-notify.org/iss-now.json')
.then(response => response.json())
.then(data => {
    setInterval(() => {
        ul.innerHTML = `
            <li>Longitude : ${data.iss_position.longitude}</li>
            <li>Latitude : ${data.iss_position.latitude}</li>
        `
    }, 5000)
})
.catch(error => {throw error})