let categorieURL = ''
let languageURL = ''
let fetchURL = 'https://v2.jokeapi.dev/joke/Any'

const jokeApiURL = 'https://v2.jokeapi.dev/joke/'
const colorPalette = ['#ffbd64', '#fff151', '#052ce3', '#087dff', '#b0e0fa', 'grey']

const resultContainer = document.querySelector('#result-container')
const buttonElt = document.querySelector('button')
const languageElt = document.getElementById('language')
const categorieElts = document.querySelectorAll('.categorie')

// Fonction qui change la couleur des bordures des inputs de type checkbox
const colorCheckboxes = (tableau) => {
    tableau.forEach((element, index) => {
        let couleur = colorPalette[index]   // // Distribue une couleur differente à chaque catégorie
        element.dataset.colorPalette = couleur // l'enregistre dans l'attribut dataset.colorPalette
        element.style.borderColor = couleur //  l'applique sur la bordure
    })
}
// Fonction qui met à jour le style des labels des checkboxes ciblées
const majStyleCheckbox = (e) => {
    // Modification du style des labels lorsque check ou non
    if (!(e.target.control.checked)) { 
        e.target.style.backgroundColor = e.target.dataset.colorPalette
        e.target.style.color = 'white'
    } else {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = e.target.dataset.colorPalette
    }
}
// Fonction qui récupère et retourne les éléments checkés d'un tableau sous forme de string
const handleCustomURL = (tableau) => {
    let url = ""
    tableau.forEach( filtre => {
        if (filtre.control.checked) url += filtre.control.value + ','
    })
    return url.slice(0,-1)
}
// Fonction qui récupère les données sur l'API
const fetchData = (fetchURL) => {
    fetch(fetchURL)
    .then(response => response.json())
    .then(data => {
        resultContainer.innerHTML = ''  // Vide resultContainer avant d'y insérer la réponse
        console.log(data)
        if(data.type === 'single') {
            resultContainer.textContent = data.joke
        } else {
            let div = document.createElement('div')
            resultContainer.appendChild(div)
            div.textContent = data.setup
            setTimeout(() => {
                let div2 = document.createElement('div')
                div2.textContent = data.delivery
                resultContainer.appendChild(div2)
            }, 2000)
        }
    })
    .catch(error => {throw error})
}
// Fonction qui génère l'URL de récupération des données
const getFetchURL = () => {
    let url = jokeApiURL
    categorieURL = handleCustomURL(categorieElts)
    url += (categorieURL || 'Any')
    console.log(url)
    languageElt.value ? url += `?lang=${languageElt.value}` : console.error('pas de langage Sélectionné')
    return url
}

// ***********************  PROGRAMME  ***********************

// STYLE : colore les checkboxes des categories
colorCheckboxes(categorieElts)

// STYLE : Au click sur chaque catégorie
categorieElts.forEach(categorie => {
    categorie.onclick = (e) => {
        majStyleCheckbox(e) // change le style du label
    }
    categorie.control.checked = false
})

languageElt.onchange = () => {
    languageURL
}

// Génère une blague en fonction des filtres sélectionnés
buttonElt.onclick = (e) => {
    e.preventDefault()
    fetchURL = getFetchURL()
    fetchData(fetchURL)
    console.log(fetchURL)
}


