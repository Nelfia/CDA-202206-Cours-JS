const bodyElt = document.querySelector('body')

const randomNumber = (min, max) => {
    return min + (Math.floor(Math.random() * (max - min)))
}

bodyElt.addEventListener('mousedown', (e) => {
    console.log(e)
    let rond = document.createElement('div')
    rond.style.backgroundColor = `rgb(${randomNumber(0, 256)}, ${randomNumber(0,256)}, ${randomNumber(0, 256)})`
    rond.style.top = (e.y - 25) + 'px'
    rond.style.left = (e.x - 25) + 'px'
    bodyElt.appendChild(rond)
    isDrawing = true
})
