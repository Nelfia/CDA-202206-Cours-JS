const bodyElt = document.querySelector('body')

const randomNumber = (min, max) => {
    return min + (Math.floor(Math.random() * (max - min)))
}

setInterval(() => {
    let rond = document.createElement('div')
    rond.style.backgroundColor = `rgb(${randomNumber(0, 256)}, ${randomNumber(0,256)}, ${randomNumber(0, 256)})`
    rond.style.top = (randomNumber(0, window.innerHeight + 1) - 25) + 'px'
    rond.style.left = (randomNumber(0, window.innerWidth + 1) - 25) + 'px'
    bodyElt.appendChild(rond)

}, 10)

