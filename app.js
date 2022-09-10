const categoriesChoices = document.querySelectorAll('.categorie')
const checkboxes = document.querySelectorAll('checkbox')
console.log(categoriesChoices)

const colorPalette = ['#ffbd64', '#fff151', '#052ce3', '#087dff', '#b0e0fa']

categoriesChoices.forEach((categorie, index) => {
    // Distribue une couleur differente à chaque
    categorie.dataset.colorPalette = colorPalette[index]
    categorie.style.borderColor = colorPalette[index]

    categorie.onclick = (e) => {
        let inputElt = document.getElementById(`${e.target[0]}`)

        console.log(e)
        console.log(e.target)
        if (e.target.control.checked) {
            console.log(e.target.control.checked)
            inputElt.style.appearance = "none"
        }
        else {
            console.log(e.target.control.checked)
            inputElt.parentNode.style.borderColor = "blue"
        }
    }
})

