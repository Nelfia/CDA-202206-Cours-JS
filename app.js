const compagnieContainer = document.querySelector('.compagnie-container')

class Guerrier {
    constructor(nom, arme = 'épée', armure = 5, degats = 10, img) {
        this.type = this.constructor.name
        this.nom = nom
        this.arme = arme
        this.armure = armure
        this.degats = degats
        this.pv = 100
        this.img = img
    }

    sePresenter = () => {
        console.log(`Je suis ${this.nom} de la classe des ${this.type} et j'attaque avec mon ${this.arme}.`)
    }

    isDead = () => this.pv <= 0

    attaquer = (cible) => {
        console.log(`le ${this.type} ${this.nom} combat le ${cible.type} ${cible.nom} `)
        cible.pv-= this.degats - cible.armure
    }

    static combat = (guerrier1, guerrier2) => {
        while ((!guerrier1.isDead()) && (!guerrier2.isDead())) {

            guerrier1.attaquer(guerrier2)
            if (guerrier2.isDead()) return guerrier2
            guerrier2.attaquer(guerrier1)
           if (guerrier1.isDead()) return guerrier1
            
            console.log(`${guerrier1.nom} a ${guerrier1.pv}pv `)
            console.log(`${guerrier2.nom} a ${guerrier2.pv}pv `)
        }
    }
}

class Chevalier extends Guerrier {
    constructor(nom, img) {
        super(nom, 'Espadon', 10 , 12, img)
    }
}

class Samourai extends Guerrier {
    constructor(nom, img) {
        super(nom, 'Katana', 5, 20, img)
    }
}

class Viking extends Guerrier {
    constructor(nom, img) {
        super(nom, 'Hache', 7 , 14, img)
    }
}

class Compagnie {
    constructor(nom) {
        this.nom = nom
        this.guerriers = []
        this.nombreDeGuerriers = 0  
    }

    sePresente = () => {
        console.log(`Dans la compagnie ${this.nom}, nous comptons actuellement ${this.nombreDeGuerriers} guerriers vivants dans nos effectifs `)
    }

    afficherCompagnie = () => {
        const compagnie = document.createElement('div')
        const compagnieNom = document.createElement('h2')
        compagnieNom.textContent = this.nom
        compagnie.classList.add('compagnie')
        compagnie.appendChild(compagnieNom)
        this.guerriers.forEach( guerrier => {
            const divElt = document.createElement('div')
            divElt.classList.add('guerrier')
            divElt.innerHTML = ` <h3>${guerrier.nom}</h3>`
            divElt.style.backgroundImage = `url("${guerrier.img}")`
            divElt.style.backgroundRepeat = 'no-repeat'
            divElt.style.backgroundSize = 'cover'
            divElt.style.backgroundPosition = 'center top'
            compagnie.appendChild(divElt)
        })
        compagnieContainer.appendChild(compagnie)
    }

    afficherGuerriers = () => {
        this.guerriers.forEach(guerrier => {
            console.log(guerrier)
        })
    }

    guerrierAppartient = (guerrier) => {
        return this.guerriers.includes(guerrier)
    }

    ajouterGuerrier = (guerrier) => {
        if (!this.guerrierAppartient(guerrier)) {
            this.guerriers.push(guerrier)
            this.nombreDeGuerriers++
        }
        
    }

    supprimerGuerrier = (guerrier) => {
        if (this.guerrierAppartient(guerrier)) {
            let index = this.guerriers.indexOf(guerrier)
            this.guerriers.splice(index, 1)
            this.nombreDeGuerriers--
        }
    }

    static bataille = (compagnie1, compagnie2) => {
        let currentGuerrier1 = compagnie1.guerriers[0]
        let currentGuerrier2 = compagnie2.guerriers[0]
        let compagniePerdante
        let compagnieGagnante

        console.log(`Nombre de guerriers dans ${compagnie1.nom} : ${compagnie1.nombreDeGuerriers}`)
        console.log(`Nombre de guerriers dans ${compagnie2.nom} : ${compagnie2.nombreDeGuerriers}`)

        while ((compagnie1.nombreDeGuerriers > 0) && (compagnie2.nombreDeGuerriers > 0)) {
            let perdant = Guerrier.combat(currentGuerrier1, currentGuerrier2)
            console.log(`Nombre de guerriers dans ${compagnie1.nom} : ${compagnie1.nombreDeGuerriers}`)
            console.log(`Nombre de guerriers dans ${compagnie2.nom} : ${compagnie2.nombreDeGuerriers}`)

            if (compagnie1.guerrierAppartient(perdant)) {
                compagnie1.supprimerGuerrier(perdant)

                if (compagnie1.nombreDeGuerriers > 0) currentGuerrier1 = compagnie1.guerriers[0]
                else {
                    compagniePerdante = compagnie1
                    compagnieGagnante = compagnie2
                }

            } else {
                compagnie2.supprimerGuerrier(perdant)
                if (compagnie2.nombreDeGuerriers > 0) currentGuerrier2 = compagnie2.guerriers[0]
                else {
                    compagniePerdante = compagnie2
                    compagnieGagnante = compagnie1
                }
            } 
        }
        console.log(`${compagniePerdante.nom} n'a plus de guerrier en vie. ${compagnieGagnante.nom} a remporté le combat !!`)
    }
}



// DONNEES ----------------------------------------------------------------

let perceval = new Chevalier('Perceval', 'https://dnfx0kvkzsynw.cloudfront.net/websites/25/personnages/perceval.jpg')
let caradoque = new Chevalier('Karadoque', 'https://dnfx0kvkzsynw.cloudfront.net/websites/25/personnages/karadoc.jpg')
let lancelot = new Chevalier('Lancelot', 'https://i.skyrock.net/4092/16894092/pics/463774427.jpg')
let leodagan = new Chevalier('Léodagan', 'https://www.serieously.com/app/uploads/2021/08/sans-titre-58-51-1024x577.jpg')
let shang = new Samourai('Shang', 'https://assets.teenvogue.com/photos/5ad797b173a9c74b36114302/2:3/w_1149,h_1724,c_limit/live-action-mulan-to-not-feature-li-shang.jpg')
let mulan = new Samourai('Mulan', 'https://static.lpnt.fr/images/2017/11/30/11512384lpw-11512587-article-jpg_4806185_1250x625.jpg')
let moushou = new Samourai('Mushu', 'https://i.ytimg.com/vi/LL06jvZP94U/maxresdefault.jpg')
let harold = new Viking('Harold', 'https://2img.net/h/media.npr.org/assets/img/2014/06/12/dragon-picture1_sq-cbfb5c7e7438238eb2367b04593b8e108ab9c9b5.jpg')
let astrid = new Viking('Astrid', 'https://ae01.alicdn.com/kf/HTB1mmDzOVXXXXbzXXXXq6xXFXXX7/Papier-peint-sur-toile-personnalis-Art-Astrid-affiche-Train-votre-Dragon-comment-former-votre-Dragon-Stickers.jpg')
let liv = new Viking('Liv', 'https://i.skyrock.net/6692/4386692/pics/3209040653_1_6_pYwcysf8.jpg')
let floki = new Viking('Floki', 'https://i.pinimg.com/originals/69/fe/13/69fe13d90e2f4236fcb7182cd77767b2.jpg')
let thor = new Viking('Thor', 'https://clipartix.com/wp-content/uploads/2018/03/thor-clipart-2018-23.jpg')

let huns = new Compagnie('Huns')
huns.ajouterGuerrier(perceval)
huns.ajouterGuerrier(lancelot)
huns.ajouterGuerrier(mulan)
huns.ajouterGuerrier(harold)
huns.ajouterGuerrier(liv)
huns.ajouterGuerrier(thor)
huns.sePresente()
huns.afficherGuerriers()
huns.afficherCompagnie()

let hotres = new Compagnie('Hotres')
hotres.ajouterGuerrier(caradoque)
hotres.ajouterGuerrier(leodagan)
hotres.ajouterGuerrier(moushou)
hotres.ajouterGuerrier(astrid)
hotres.ajouterGuerrier(floki)
hotres.ajouterGuerrier(shang)
hotres.sePresente()
hotres.afficherGuerriers()
hotres.afficherCompagnie()

Compagnie.bataille(hotres, huns)