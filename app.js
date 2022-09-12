// CONSTANTES - Elements --------------------------------------------------
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const categoriesChoicesElt = document.querySelector('#categories-choices')
const categoriesChoicesElts = document.querySelectorAll('.categorie')
const radioCategoriesElts = document.querySelectorAll('#radio-categories div')
const blacklistFlags = document.querySelectorAll('.flag')
const jokeTypes = document.querySelectorAll('.joke-type')
const buttonElt = document.querySelector('button')
const resultContainer = document.getElementById('result-container')
const select = document.querySelector('select')


// CONSTANTES ------------------------------------------------------------
const jokeApiUrl = 'https://v2.jokeapi.dev/joke'
const colorPalette = ['#ffbd64', '#fff151', '#052ce3', '#087dff', '#b0e0fa', 'grey']



// VARIABLES ------------------------------------------------------------
let promiseUrl = "https://v2.jokeapi.dev/joke/Any"
let customs = []



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

const getCustomUrl = (tableau) => {

    tableau.forEach( element => {
        if(element.control.checked) {
            if(!(tableau.includes(`${element.outerText}`))) tableau.push(element)
        }
    })
    console.log(customs.join(','))
}

const genererPromiseUrl = () => {
    promiseUrl = jokeApiUrl + categorieUrl
}

// ================= DEBUT DU PROGRAMME =============================

// INITIALISATION -------------------------------------------------

// Affichage : suppression des cases à cocher des checkboxes
checkboxes.forEach(checkbox => {
    checkbox.style.appearance = 'none'
})
categoriesChoicesElt.style.display = 'none'

let customUrl = ""
// Au changement de choix pour la categorie: si la categorie "any" est checked alors #categories-choices disparait
radioCategoriesElts.forEach(element => {
    categorieUrl = '/Any'
    element.onchange = (e) => {
        console.log(e)
        if (e.target.id === 'any') {
            categoriesChoicesElt.style.display = 'none'
        } else if (e.target.id === 'custom') {
            categoriesChoicesElt.style.display = 'flex'
            categorieUrl = getCustomUrl(categoriesChoicesElts)
        }
    }
})

// Affichage : style des labels des inputs de type checkbox
changerStyleCheckboxes(categoriesChoicesElts)
changerStyleCheckboxes(blacklistFlags)
changerStyleCheckboxes(jokeTypes)

select.onchange = () => {
    let languageUrl =  ""
    switch(select.value) {
        case 'cs':
            languageUrl = 'lang=cs'
            break;
        case 'de':
            languageUrl = 'lang=de'
            break;
        case 'en':
            languageUrl = 'lang=en'
            break;
        case 'fr':
            languageUrl = 'lang=fr'
            break;
        case 'es':
            languageUrl = 'lang=es'
            break;
        case 'pt':
            languageUrl = 'lang=pt'
            break;
        default:
            ;
    }
}


// Au click sur le bouton, envoie la demande de blague à l'API
buttonElt.onclick = (e) => {
    e.preventDefault()
    let promiseUrl = genererPromiseUrl()
    console.log(promiseUrl)
    console.log(genererPromiseUrl())
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
                }, 2500)

            }
        })
        .catch((error) => console.log("erreur dans le fetch :" + error))
}