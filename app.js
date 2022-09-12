const body = document.querySelector('body')

fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {
    data.forEach( pays => {
        console.log(pays)
        if (pays.ccn3){
            let imgSrc =`https://countryflagsapi.com/png/${pays.ccn3}`
            const img = document.createElement('img')
            img.src = imgSrc
            body.appendChild(img)
        } else throw error
    })
})
.catch(error => { throw error})