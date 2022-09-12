const book1Elt = document.querySelector('.book1')
const starkAllegiance = document.querySelector('.stark')
const lannisterElt = document.querySelector('.lannister')

const fetchData = () => {
    fetch("https://www.anapioficeandfire.com/api/books/1")
        .then((response) => response.json())
        .then((data) => {
            data.characters.forEach(character => {
                fetch(character)
                    .then((response1) => response1.json())
                    .then(characterData => {
                        
                        if(characterData.allegiances.includes("https://anapioficeandfire.com/api/houses/362")
                        || characterData.allegiances.includes("https://www.anapioficeandfire.com/api/houses/362")) {
                            const li = document.createElement('li')
                            li.textContent = characterData.name || characterData.aliases[0]
                            starkAllegiance.appendChild(li)
                        }

                    })
                    .catch((error) => {throw error})
            })
        })
        .catch(error => { throw error })
}

fetchData()