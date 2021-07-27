const multijoueur = document.getElementById("toggle")
const statut = document.querySelector("h2")
const grid = document.getElementById("grid")
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

//etat de base
multijoueur.checked = true
play2()

function recommencer(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".item").forEach(cell => cell.
        innerHTML = "")
}

function changement(){
    if(multijoueur.checked == true){
        multijoueur.checked == false
        recommencer()
        play2()
    }

    if(multijoueur.checked == false){
        multijoueur.checked == true
        recommencer()
        play1()
    }
}

function play1(){
    //purge des items
    
    document.querySelectorAll(".item").forEach(cell => cell.
        remove())

    for (let i = 0; i <9; i++){
     var di = document.createElement("div")
     di.className =("item")
     di.dataset.index = i
     grid.append(di)
    }

    //début play1
    document.querySelectorAll(".item").forEach(cell => cell.
        addEventListener("click", gestionClicItem2))

        function gestionClicItem2(){
            //on récupère l'index de l'item cliquée
            const indexItem = parseInt(this.dataset.index)
            
            if(etatJeu[indexItem] !== "" || !jeuActif){
                return
            }
        
            etatJeu[indexItem] = joueurActif
            this.innerHTML= joueurActif
            
            verifGagne()
            //tour de l'ordinateur
           let random = Math.floor(1 + Math.random() * grid.childElementCount)
           child = document.querySelector('#grid>div:nth-child('+ random + ')')
           if(child == ""){
           child.innerHTML = "O"
        }
            else
            while (child == "X" || child == "O"){
                let random = Math.floor(1 + Math.random() * grid.childElementCount)
           child = document.querySelector('#grid>div:nth-child('+ random + ')')
         return   
        }
            child.innerHTML ="O"
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
        
            statut.innerHTML = tourJoueur()

        }
    
}


// code 2 joueurs
function play2(){

    document.querySelectorAll(".item").forEach(cell => cell.
        remove())

    for (let i = 0; i <9; i++){
     var di = document.createElement("div")
     di.className =("item")
     di.dataset.index = i
     grid.append(di)
    }

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
    }
