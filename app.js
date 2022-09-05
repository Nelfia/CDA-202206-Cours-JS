// VARIABLES ----> ELEMENTS
const bodyElt = document.querySelector('body')
const inputElt = document.querySelector('#nouvelle-tache')
const buttonElt = document.querySelector('button')
const olElt = document.querySelector('ol')

let taches = []

// FONCTIONS --------------------------------------------

// Importer les taches enregistrées dans le localStorage
const importerLS = () => {
    if (localStorage.taches) {
        taches = JSON.parse(localStorage.taches)
        console.log(taches)
    }
}

// Exporter le tableau des taches vers le localStorage
const exporterLS = () => {
    localStorage.setItem('taches', JSON.stringify(taches))
}

// Afficher la liste des taches sur la page
const afficherTaches = () => {
    if (taches.length > 0) {
        taches.forEach(tache => {
            let li = document.createElement('li')
            li.classList.add('taches')

            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.classList.add('checkbox')

            let text = document.createElement('p')
            text.innerHTML = `${tache}`

            let corbeille = document.createElement('div')
            let imgCorbeille = document.createElement('img')
            imgCorbeille.classList.add('corbeille')
            imgCorbeille.src = `./img/corbeille-fermee.png`
            imgCorbeille.alt = `image d'une corbeille fermée`

            corbeille.appendChild(imgCorbeille)
            li.appendChild(checkbox)
            li.appendChild(text)
            li.appendChild(corbeille)
            olElt.appendChild(li)
        })
    } else {
        let li = document.createElement('li')
        li.innerHTML = `Il n'y a aucune tâche, BRAVO !`
        li.style.color = `aliceblue`
        olElt.appendChild(li)
    }
}

// Mettre à jour la liste des tâches ds le localStorage & sur la Page
const majTaches = () => {
    exporterLS()
    olElt.innerHTML = ''
    importerLS()
    afficherTaches()
}

// Ajouter une nouvelle tache et maj LS et Page
const ajouterTache = () => {
    if((inputElt.value) && (inputElt.value != '')) {
        taches.push(`${inputElt.value}`)
    } else {
        console.log('Il n\'y a rien à rajouter')
    }
    majTaches()
}


// DEBUT DU PROGRAMME =================================

// A l'arrivée sur la page => affichage, s'il y en a des taches du localStorage 
importerLS()
afficherTaches()

// Ajout d'une nouvelle tache au click sur le bouton "+"
buttonElt.onclick = () => {
    ajouterTache()
}
// Ajout d'une nouvelle tache lorsque la touche entrée est appuyée ds l'input
inputElt.onkeydown = (e) => {
    if(e.key == 'Enter') {
        ajouterTache()
        inputElt.value = ''
    }
}


const checkboxes = document.querySelectorAll('.checkbox')
// Action au click sur la checkbox
checkboxes.forEach(checkbox => {
    checkbox.onclick = (e) => {
        console.log(e)
        if (checkbox.checked) {
            console.log(checkbox.checked)
            checkbox.parentNode.classList.add('checked')
        } else {
            checkbox.parentNode.classList.remove('checked')
        }
    }
})

// Action au click sur la corbeille
const corbeilles = document.querySelectorAll('.corbeille')
corbeilles.forEach( corbeille => {
    corbeille.onclick = (e) => {
        confirm('Etes-vous certain de vouloir supprimer cette tâche ?')
        console.log(e)
    }
})