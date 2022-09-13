const body = document.querySelector('body')

const fetchData = async () => {
    let data2;
    await fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => data2 = data)
        .catch(error => { throw error })

        data2.forEach( pays => {
            console.log(pays)
            if (pays.ccn3) {
                let imgSrc = `https://countryflagsapi.com/png/${pays.ccn3}`
                const img = document.createElement('img')
                img.src = imgSrc
                img.title = pays.name.official
                body.appendChild(img)
            } else {throw error}
        })
        console.log(data2)
}
fetchData()