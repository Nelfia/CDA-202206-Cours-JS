const jokeApiURL = 'https://v2.jokeapi.dev/joke/'
let categorieURL = ''
let fetchURL = 'https://v2.jokeapi.dev/joke/Any'

const colorPalette = ['#ffbd64', '#fff151', '#052ce3', '#087dff', '#b0e0fa', 'grey']

const resultContainer = document.querySelector('#result-container')
const buttonElt = document.querySelector('button')
const categorieElts = document.querySelectorAll('.categorie')

// Change le style des inputs de type checkbox
const changerStyleCheckboxes = (tableau) => {
    tableau.forEach((element, index) => {
        // Distribue une couleur differente à chaque catégorie et l'enregistre dans l'élément
        let couleur = colorPalette[index]
        element.dataset.colorPalette = couleur
        element.style.borderColor = couleur
    })
}

// Met à jour le style des checkboxes ciblées
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

const handleCustomURL = (tableau) => {
    categorieURL = ""
    tableau.forEach( filtre => {
        if (filtre.control.checked) categorieURL += filtre.control.value + ','
    })
    categorieURL = categorieURL.slice(0,-1)
}

const fetchData = (fetchURL) => {
    fetch(fetchURL)
    .then(response => response.json())
    .then(data => {
        resultContainer.innerHTML = ''
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

changerStyleCheckboxes(categorieElts)

categorieElts.forEach(categorie => {
    categorie.onclick = (e) => {
        majStyleCheckbox(e)
    }
    categorie.control.checked = false
})

buttonElt.onclick = (e) => {
    e.preventDefault()
    handleCustomURL(categorieElts)
    fetchURL = jokeApiURL + (categorieURL ? categorieURL : 'Any')
    fetchData(fetchURL)
    console.log(fetchURL)
}


