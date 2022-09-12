const book1Elt = document.querySelector('.book1')
const starkAllegiance = document.querySelector('.stark')
const lannisterElt = document.querySelector('.lannister')

const fetchData = () => {
    fetch("https://www.anapioficeandfire.com/api/books/1")
        .then((response) => response.json())
        .then(bookData => {
            bookData.characters.forEach(character => {
                fetch(character)
                    .then((response1) => response1.json())
                    .then(characterData => {
                        const liElt = document.createElement('li')
                        let name = characterData.name ? characterData.name : characterData.aliases[0]
                        liElt.textContent = name
                        book1Elt.appendChild(liElt)

                        let allegeance = characterData.allegiances

                        if (allegeance[0] === "https://anapioficeandfire.com/api/houses/362") {
                            starkAllegiance.appendChild(liElt)
                        } 
                        else if ((allegeance[0] === "https://anapioficeandfire.com/api/houses/229") && !character.died) lannisterElt.appendChild(liElt)

                    })
                    .catch((error) => {throw error})
            })
        })
        .catch(error => { throw error })
}

fetchData()