// CONSTANTES - Elements --------------------------------------------------
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const categoriesChoicesElt = document.querySelector('#categories-choices')
const categoriesChoicesElts = document.querySelectorAll('.categorie')
const radioCategoriesElts = document.querySelectorAll('#radio-categories div')
const blacklistFlags = document.querySelectorAll('.flag')
const jokeTypes = document.querySelectorAll('.joke-type')

// CONSTANTES ------------------------------------------------------------
const jokeApiUrl = 'https://v2.jokeapi.dev/joke'
const colorPalette = ['#ffbd64', '#fff151', '#052ce3', '#087dff', '#b0e0fa', 'grey']

// FONCTIONS -------------------------------------------------------------

// Modifier le style des elements d'un tableau d'inputs type checkbox => Distribuer des couleurs aux labels + dynamiser le style en fonction du "check"
const changerStyleCheckboxes = (tableau) => {
    tableau.forEach((element, index) => {
        // Distribue une couleur differente à chaque catégorie et l'enregistre dans l'élément
        let couleur = colorPalette[index]
        element.dataset.colorPalette = couleur
        element.style.borderColor = couleur

        element.onclick = (e) => {
            // Modification du style des labels lorsque check ou non
            if (!(e.target.control.checked)) {
                e.target.style.backgroundColor = e.target.dataset.colorPalette
                e.target.style.color = 'white'
            } else {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = e.target.dataset.colorPalette
            }
        }
    })
}


// ================= DEBUT DU PROGRAMME =============================

// INITIALISATION -------------------------------------------------
categoriesChoicesElt.style.display = 'none'
// Si la categorie "any" est checked alors #categories-choices disparait
radioCategoriesElts.forEach(element => {
    element.onchange = (e) => {
        if (e.target.id === 'any') categoriesChoicesElt.style.display = 'none'
        else categoriesChoicesElt.style.display = 'block'
    }
})
// Affichage : suppression des cases à cocher des checkboxes
checkboxes.forEach(checkbox => {
    checkbox.style.appearance = 'none'
})
// Affichage : style des labels des inputs de type checkbox
changerStyleCheckboxes(categoriesChoicesElts)
changerStyleCheckboxes(blacklistFlags)
changerStyleCheckboxes(jokeTypes)

const resultContainer = document.getElementById('result-container')
console.log(resultContainer)

let promiseUrl = jokeApiUrl + "/Any"
fetch(promiseUrl)
    .then((response) => response.json())
    .then((data) => {
        if (data.type === "single") {
            resultContainer.innerHTML = `<p>${data.joke}</p>`
        }
        else {
            resultContainer.innerHTML = `<p>${data.setup}</p><br />`
            setTimeout(() => {
                resultContainer.innerHTML += `<p>${data.delivery}</p>`
                resultContainer.appendChild(joke2)
            }, 2500)
            
        }
    })
    .catch((error) => console.log("erreur dans le fetch :" + error))