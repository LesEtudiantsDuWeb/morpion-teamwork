const multijoueur = document.getElementById("toggle")
multijoueur.checked = false
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//messages
const gagné = () => 'le joueur ' + joueurActif + ' a gagné'
const égalité = () => "Egalité"
const tourJoueur = () => "c'est au tour du joueur " + joueurActif

statut.innerHTML = tourJoueur()

document.querySelectorAll(".item").forEach(cell => cell.
    addEventListener("click", gestionClicItem))
document.querySelector("#reset").addEventListener("click", recommencer)

function gestionClicItem(){
    //on récupère l'index de l'item cliquée
    const indexItem = parseInt(this.dataset.index)
    
    if(etatJeu[indexItem] !== "" || !jeuActif){
        return
    }

    etatJeu[indexItem] = joueurActif
    this.innerHTML= joueurActif

    verifGagne()
}

function verifGagne(){
    let tourGagnant= false
    for(let conditionVictoire of conditionsVictoire){
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]
        if(val1 == "" || val2 == "" || val3 == ""){
            continue
        }
        if(val1 == val2 && val2 == val3){
            tourGagnant = true
            break
        }
    }
    if(tourGagnant){
        statut.innerHTML = gagné()
        jeuActif = false
        return
    }

    if(!etatJeu.includes("")){
        statut.innerHTML = égalité()
        jeuActif = false
        return
    }

    joueurActif = joueurActif == "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

function recommencer(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".item").forEach(cell => cell.
        innerHTML = "")
}

function aléatoire(){
    var tour = math.floor(math.random()*2+1)
}