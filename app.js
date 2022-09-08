class Guerrier {
    constructor(nom, arme = 'épée', armure = 5, degats = 10) {
        this.type = this.constructor.name
        this.nom = nom
        this.arme = arme
        this.armure = armure
        this.degats = degats
        this.pv = 100
    }

    sePresenter = () => {
        console.log(`Je suis ${this.nom} de la classe des ${this.type} et j'attaque avec mon ${this.arme}.`)
    }

    isDead = () => {
        if (this.pv <= 0) return true
        else return false
    }

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
    constructor(nom) {
        super(nom, 'Espadon', 10 , 12)
    }
}

class Samourai extends Guerrier {
    constructor(nom) {
        super(nom, 'Katana', 5, 20)
    }
}

class Viking extends Guerrier {
    constructor(nom) {
        super(nom, 'Hache', 7 , 14)
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

let perceval = new Chevalier('Perceval')
let caradoque = new Chevalier('Caradoque')
let lancelot = new Chevalier('Lancelot')
let leodagan = new Chevalier('Léodagan')
let shang = new Samourai('Shang')
let mulan = new Samourai('Mulan')
let moushou = new Samourai('Moushou')
let harald = new Viking('Harald')
let astrid = new Viking('Astrid')
let liv = new Viking('Liv')
let floki = new Viking('Floki')
let thor = new Viking('Thor')

let huns = new Compagnie('Huns')
huns.ajouterGuerrier(perceval)
huns.ajouterGuerrier(lancelot)
huns.ajouterGuerrier(mulan)
huns.ajouterGuerrier(harald)
huns.ajouterGuerrier(liv)
huns.ajouterGuerrier(thor)
huns.sePresente()
huns.afficherGuerriers()

let hotres = new Compagnie('Hotres')
hotres.ajouterGuerrier(caradoque)
hotres.ajouterGuerrier(leodagan)
hotres.ajouterGuerrier(moushou)
hotres.ajouterGuerrier(astrid)
hotres.ajouterGuerrier(floki)
hotres.ajouterGuerrier(shang)
hotres.sePresente()
hotres.afficherGuerriers()

Compagnie.bataille(hotres, huns)