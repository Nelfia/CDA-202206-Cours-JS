const changeContainer = document.querySelector('#change-container')
const cryptoMonnaiesListElt = document.querySelector('#cryptos-monnaies-list')
const cryptoChoiceElt = document.querySelector('#crypto-choice')
const historiqueElt = document.querySelector('#historique')
const prixElt = document.querySelector('#prix')

const cryptoMonnaies = [
    {
        name: 'Bitcoin',
        code: 'BTC'
    },
    {
        name: 'Ethereum',
        code: 'ETH'
    },
    {
        name: 'Cardano',
        code: 'ADA'
    },
    {
        name: 'Polkadot',
        code: 'DOT'
    },
    {
        name: 'Cronos',
        code: 'CRO'
    },
    {
        name: 'Polygon',
        code: 'MATIC'
    }
]

let prixPrecedent;
let previousMonney;
let currentPrice;
let selectedChoice;
let fetchURL = ""
let intervalId = ""

// Ajoute les crypto Monnaies en option dans la datalist
cryptoMonnaies.map(cryptoMonnaie => {
    cryptoMonnaiesListElt.innerHTML += (`
        <option value="${cryptoMonnaie.code}">${cryptoMonnaie.name}</option>
    `)
})

const fetchData = () => {
    fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cryptoMonnaies.forEach((cryptoMonnaie, index) => {
                if (data.data.base === cryptoMonnaie.code) {
                    selectedChoice = cryptoMonnaies[index]
                }
            })
            monnaie.textContent = `1 ${selectedChoice.name}`

            if (!selectedChoice.amount) {
                prixElt.textContent = `${(parseFloat(data.data.amount).toFixed(2))}€`
            } else {
                prixPrecedent = selectedChoice.amount
                currentPrice = data.data.amount
                getEvolutionInfos()
            }
            selectedChoice.amount = data.data.amount
            previousMonney = selectedChoice.name
            afficherHistorique(prixElt)
        })
        .catch(error => { throw error })
}

const getFetchURL = () => {
    if (cryptoChoiceElt.value) fetchURL = `https://api.coinbase.com/v2/prices/${cryptoChoiceElt.value}-EUR/buy`
    else throw error
    console.log(fetchURL)
}

cryptoChoiceElt.onchange = (e) => {
    selectedChoice = e.target
    historiqueElt.textContent = ''
    getFetchURL()
    if (selectedChoice) {
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            fetchData()
        }, 1000)
    }
}

const getEvolutionInfos = () => {
    let sup = document.createElement('sup')
    if (!prixPrecedent) throw 'Pas de prix précédent à comparer'
    prixElt.textContent = `${currentPrice}€`

    if (prixPrecedent > currentPrice) {
        sup.textContent = '▼'
        prixElt.style.color = 'red'
    } else if (prixPrecedent < currentPrice) {
        sup.textContent = '▲'
        prixElt.style.color = 'green'
    } else if (prixPrecedent === currentPrice) {
        console.log('prixPrecedent === currentPrice ')
        sup.textContent = '►'

        prixElt.style.color = 'blue'
    } else throw 'Problème dans getEvolutionInfos'
    prixElt.appendChild(sup)
}

const afficherHistorique = (prixElt) => {
    const li = document.createElement('li')
    if (selectedChoice.amount !== prixPrecedent) {
        if (prixElt.textContent.includes('▲')) li.style.color = 'green'
        else if (prixElt.textContent.includes('▼')) li.style.color = 'red'
        li.textContent = `1${selectedChoice.name} = ${prixElt.textContent}`
        historiqueElt.appendChild(li)
    }
}