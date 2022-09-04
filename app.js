// VARIABLES ----> ELEMENTS
const bodyElt = document.querySelector('body')
const inputElt = document.querySelector('#nouvelle-tache')
const buttonElt = document.querySelector('button')
const olElt = document.querySelector('ol')

let taches = []

const ajouterTache = (str) => {
    if(str) {
        let nouvelleTache = str
        taches.push(nouvelleTache)
        localStorage.setItem('taches', JSON.stringify(taches))
        console.log(localStorage) 
    }
    olElt.innerHTML = ""
    localStorage.getItem('taches', JSON.parse(localStorage.taches))
    taches.forEach(tache => {
        let li = document.createElement('li')
        let box = document.createElement('input')
        box.type = 'checkbox'
        box.classList.add('checkbox')
        li.appendChild(box)
        li.innerHTML+= `  ${tache}`
        olElt.appendChild(li)
    })
}

buttonElt.addEventListener('click', () => {
    ajouterTache(inputElt.value)
    inputElt.value = ''
})
inputElt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        ajouterTache(inputElt.value)
        inputElt.value = ''
    }
})
