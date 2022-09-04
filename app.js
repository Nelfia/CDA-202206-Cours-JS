// VARIABLES ----> ELEMENTS
const bodyElt = document.querySelector('body')
const inputElt = document.querySelector('#nouvelle-tache')
const buttonElt = document.querySelector('button')
const olElt = document.querySelector('ol')

let taches = []

// Récupération et affichage des tâches déjà enregistrées
if(localStorage.taches) {
    let tachesLocalStorage = JSON.parse(localStorage.taches)
    if(tachesLocalStorage.length > 0) {
        tachesLocalStorage.forEach( tache => {
            taches.push(tache)
        })
        taches.forEach(tache => {
            let li = document.createElement('li')
            let box = document.createElement('input')
            box.type = 'checkbox'
            box.classList.add('checkbox')
            li.appendChild(box)
            li.innerHTML += `  ${tache}`
            olElt.appendChild(li)
        })
    }
}

// Fonction pour ajouter une nouvelle tâche
const ajouterTache = (str) => {
    if (str) {
        let nouvelleTache = str
        taches.push(nouvelleTache)
        localStorage.setItem('taches', JSON.stringify(taches))
    }
    olElt.innerHTML = ""
    taches.forEach(tache => {
        let li = document.createElement('li')
        let box = document.createElement('input')
        box.type = 'checkbox'
        box.classList.add('checkbox')
        li.appendChild(box)
        li.innerHTML += `  ${tache}`
        olElt.appendChild(li)
    })
}

// Action au click sur le bouton
buttonElt.addEventListener('click', () => {
    ajouterTache(inputElt.value)
    inputElt.value = ''
})

// Action lorsque touche Enter appuyée dans l'input
inputElt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        ajouterTache(inputElt.value)
        inputElt.value = ''
    }
})
