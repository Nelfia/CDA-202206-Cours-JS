const bodyElt = document.querySelector('body')

const randomNumber = (min, max) => {
    return min + (Math.floor(Math.random() * (max - min)))
}

bodyElt.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        bodyElt.style.background = `rgb(${randomNumber(0, 256)}, ${randomNumber(0,256)}, ${randomNumber(0, 256)})`
    }
})
