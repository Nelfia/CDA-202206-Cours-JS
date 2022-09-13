const article = document.querySelector('article')
const input = document.querySelector('input')
const button = document.querySelector('button')
const ul = document.querySelector('ul')

let fetchURL;

let barCodeList = [];
// Récupérer et afficher l'historique des codes-barre
const majLS = () => {
    ul.innerHTML = ""
    barCodeList = []
    if (localStorage.barCodeList) {
        console.log(localStorage)
        let barCodeListLS = JSON.parse(localStorage.barCodeList)
        if (barCodeListLS.length > 0) {
            barCodeListLS.forEach(barCode => {
                const li = document.createElement('li')
                li.textContent = barCode
                ul.appendChild(li)
                barCodeList.push(barCode)
            })
        }
    }
}

// Récupération des données sur le serveur et traitement
const fetchData = () => {
    if (!input.value) throw 'input vide'
    article.innerHTML = ""
    fetchURL = `https://world.openfoodfacts.org/api/v0/product/${input.value}.json`

    fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
            data = data
            console.log(data)
            let h2 = document.createElement('h2')
            h2.innerHTML = data.product.product_name_fr 
            article.appendChild(h2)
            let div = document.createElement('div')
            div.classList.add('images')
            article.appendChild(div)
            let img = document.createElement('img')
            img.src = data.product.image_url
            div.appendChild(img)
            let ul = document.createElement('ul')
            ul.innerHTML = `
            <li><h3>Allergènes :</h3> ${data.product.allergens_imported || 'Inconnu'}</li>
            <li><h3>Nutri-score :</h3> ${data.product.nutriscore_score || 'Inconnu'}</li>
            <li><h3>Macro-nutriments :</h3> 
                <ul>
                    <li><h4>Glucides :</h4> ${data.product.nutriments.carbohydrates || 'Inconnu'}g pour 100g</li>
                    <li><h4>Lipides :</h4> ${data.product.nutriments.fat || 'Inconnu'}</li>
                    <li><h4>Protéines :</h4> ${data.product.nutriments.proteins || 'Inconnu'}</li>
                </ul>
            </li>
            <li><h3>kcal :</h3> ${data.product.nutriments['energy-kcal']}</li>
            <li><h3>Ingrédients :</h3> ${data.product.ingredients_text_fr || 'Inconnu'}</li>
        `
            article.appendChild(ul)
        })
        .catch(error => { throw error })

        barCodeList.push(input.value)
        localStorage.setItem("barCodeList", JSON.stringify(barCodeList))
        barCodeList.innerHTML = ""
        majLS()
        input.value = ""

}

// ======================= DEBUT PROGRAMME ===================

// Récupération et affichage des éléments du localStorage dans l'historique, s'il y en a.
majLS()
// Lorsqu'on appuie sur la touche entrée dans l'input
input.onkeydown = (e) => {
    if (e.key === "Enter") button.click()
}
// Lorsqu'on appuie sur le bouton
button.onclick = () => {
    fetchData()
}