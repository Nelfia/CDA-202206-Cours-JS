const bouton = document.querySelector('button')
const tailleInput = document.getElementById('taille')
const poidsInput = document.getElementById('poids')
const div = document.querySelector('div')
let tab = []


const recupererDate = () => {
    let now = new Date()
    let jour = now.getDay()
    let mois = now.getMonth()
    let annee = now.getFullYear()
    return `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`
}

bouton.onclick = () => {
    if ((tailleInput.value != 0) && (poidsInput.value != 0)) {
        let personne = {
            taille: tailleInput.value,
            poids: poidsInput.value,
            imc: poidsInput.value / (tailleInput.value ** 2),
            date: recupererDate()
        }
        let retour = `le ${personne.date}: avec une taille de ${personne.taille}m et un poids de ${personne.poids}kg, votre IMC est de ${personne.imc}</br>`
        div.innerHTML += retour
        console.log(personne)
        tab += personne
    }
}

console.log(localStorage)
