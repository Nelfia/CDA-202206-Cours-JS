const body = document.querySelector('body')
const articlesContainer = document.querySelector('#articles-container')
const precedent = document.querySelector('#precedent')
const suivant = document.querySelector('#suivant')
const slides = document.querySelector(`#slides`)


let articles = []
let currentArticle = 0

class Article {
    constructor(titre, resume, img) {
        this.titre = titre
        this.resume = resume
        this.img = img
        this.left = 0
    }

    creerArticle = () => {
        let articleElt = document.createElement('article')
        articleElt.style.backgroundImage = `url(${this.img})`
        articlesContainer.appendChild(articleElt)

        let h2 = document.createElement('h2')
        h2.innerHTML = `${this.titre}`
        articleElt.appendChild(h2)

        let p = document.createElement('p')
        p.innerHTML = `${this.resume}`
        articleElt.appendChild(p)
    }

}

let article1 = new Article('Artemis : pourquoi veut-on renvoyer des humains sur la Lune ?', 'La mission Artemis, qui prévoit le retour de l’humain sur la Lune, devait débuter ce lundi 29 août avec le décollage de la nouvelle fusée de la Nasa depuis le Cap Canaveral en Floride. Mais des problèmes techniques ont été rencontrés, ...', 'https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2022/08/as12-47-6897hrweb-5dd3-750x410.jpeg')
articles.push(article1)

let article2 = new Article('Est-il possible de tordre l’espace-temps à l’aide du warp drive ?', `Et si, au lieu de se déplacer lui-même sur des années-lumière, l'humain rapprochait simplement sa destination… en contractant l'espace-temps ?
L’idée paraît folle... `, 'https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2022/07/30005_1754559_k2_k1_4033944-750x410.jpg')
articles.push(article2)

let article3 = new Article('Réchauffement climatique : notre corps pourra-t-il supporter les augmentations de température ?', 'La température à la surface du globe continue d’augmenter. Le GIEC prévoit un réchauffement planétaire de 1,5°C d’ici 2030 par rapport à l’ère préindustrielle. Même en limitant cette augmentation, une question se pose : est-ce que l’humanité sera capable de survivre à la chaleur ?...', `https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2022/08/temperature-chaleur-humain-regulation-750x410.jpg`)
articles.push(article3)

let article4 = new Article('Au Chili, le sol s’est ouvert sous nos pieds', 'Le 30 Juillet dernier, dans la petite ville de Tierra Amarilla au Nord du Chili, le sol s’est effondré, formant un énorme cratère si profond qu’on n’en voyait pas le fond....', `https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2022/08/fze5taxxeae4nsi-653x410.png`)
articles.push(article4)

// DEBUT DU PROGRAMME

articles.forEach((article, key) => {
    article.creerArticle()

    let div = document.createElement('div')
    div.classList.add('slide')
    div.dataset.index = key
    // Au clic sur un des points, changement sur la bonne slide
    div.onclick = (e) => {
        reduireSlideCursor()
        let index = div.dataset.index
        console.log(index)
        currentArticle = index
        articlesContainer.style.left = `${0 - (currentArticle) * 68}vw`
        augmenterSlideCursor()
        // console.log(currentArticle)
    }
    slides.appendChild(div)
})

const slidesList = document.querySelectorAll('.slide')

const reduireSlideCursor = () => {
    console.log(currentArticle)
    slidesList[currentArticle].style.width = '10px'
    slidesList[currentArticle].style.height = '10px'
}

const augmenterSlideCursor = () => {
    console.log(currentArticle)
    slidesList[currentArticle].style.width = '20px'
    slidesList[currentArticle].style.height = '20px'
}

augmenterSlideCursor()

suivant.onclick = () => {
    reduireSlideCursor()
    if (currentArticle == articles.length - 1) currentArticle = 0
    else currentArticle++
    articlesContainer.style.left = `${0 - (currentArticle) * 68}vw`
    augmenterSlideCursor()
}

precedent.onclick = () => {
    reduireSlideCursor()
    if (currentArticle == 0) currentArticle = (articles.length - 1)
    else currentArticle--
    console.log(currentArticle)
    articlesContainer.style.left = `${0 - (currentArticle) * 68}vw`
    console.log(slides[currentArticle])
    augmenterSlideCursor()
}

setInterval(() => {
    reduireSlideCursor()
    if (currentArticle == articles.length - 1) currentArticle = 0
    else currentArticle++
    articlesContainer.style.left = `${0 - (currentArticle) * 68}vw`
    augmenterSlideCursor()
}, 3000)

body.onkeydown = (e) => {
    if (e.key === " ") {
        reduireSlideCursor()
        currentArticle = 0
        articlesContainer.style.left = `${0 - (currentArticle) * 68}vw`
        augmenterSlideCursor()
    }
}