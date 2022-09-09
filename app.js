const pageHeight = document.documentElement.scrollHeight
const windowHeight = window.innerHeight
const maxHeight = pageHeight - windowHeight
const barProgressElt = document.querySelector('#bar-progress')

// Fait grandir la barre de progression du bas de la page en fonction de l'endroit où on se situe dans l'article
document.body.onscroll = () => {
    barProgressElt.style.width = `${Math.round(window.scrollY/maxHeight*100)}%`
}