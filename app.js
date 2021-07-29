const multijoueur = document.getElementById("toggle")
const statut = document.querySelector("h2")
const grid = document.getElementById("grid")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

var pos1 = Array()
var pos2 = Array()
var pos3 = Array()

var item1 = Array()
var item2 = Array()
var item3 = Array()

const conditionsVictoire = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
] // possibilité de victoire 2 joueurs

const tableauCoupVictoire = [
    [0, 3, 6], [0, 1, 2], [2, 1, 0], [2, 5, 8],
    [8, 5, 2], [8, 7, 6], [6, 7, 8], [6, 3, 0],
    [4, 0, 8], [4, 1, 7], [4, 2, 6], [4, 5, 3],
    [4, 8, 0], [4, 7, 1], [4, 6, 2], [4, 3, 5],
    [0, 6, 3], [0, 2, 1], [8, 2, 5], [8, 6, 7],
    [1, 7, 4], [5, 3, 4],
] // possibilité de victoire de l'ordinateur

const tableauTuPerd = [
    [4, 2, 8], [4, 0, 6], [4, 6, 0], [4, 8, 2],
] // Empêche la victoire du joueur

//messages
const gagné = () => 'le joueur ' + joueurActif + ' a gagné'
const gagné1 = () => 'Vous avez gagné'
const gagné2 = () => "L'ordinateur à gagné"
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
     di.id = i
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
            jeuAuto() //tour de l'ordinateur
        }
        function verifGagne(){
            let tourGagnant= false
            for(let conditionVictoire of conditionsVictoire){
                var val1 = etatJeu[conditionVictoire[0]]
                var val2 = etatJeu[conditionVictoire[1]]
                var val3 = etatJeu[conditionVictoire[2]]
                if(val1 == "" || val2 == "" || val3 == ""){
                    continue
                }
                if(val1 == val2 && val2 == val3){
                    tourGagnant = true
                    break
                }
            }
            if(tourGagnant){
                if(val1 == "X"){
                statut.innerHTML = gagné1()
                }
                if(val1 == "O"){
                statut.innerHTML = gagné2()
                }
                jeuActif = false
                return
            }
        
            if(!etatJeu.includes("")){
                statut.innerHTML = égalité()
                jeuActif = false
                return
            }
        }
        function jeuAuto(){
            if(jeuActif == true){
            if(victoire()){}
                else{
            if(unCoupObligé()){}
                else{
            if(itemCentral()){}
                else{
            if(tuPerd()){} 
                else{
            unItemVide();
                return null
                    }
                    }
                    }
                    }          
                                }
        }     
    function unItemVide(){
        var position = etatJeu.indexOf("")
        child = document.getElementById(position)
        child.innerHTML = "O"
        etatJeu[position] ="O"
        verifGagne()
        return null
    }
    function itemCentral(){
        if(etatJeu[4] === ""){
            document.getElementById("4").innerHTML = "O"
            etatJeu[4] = "O"
            verifGagne()
            return true
        }
        else{return false}
    }
    function victoire(){
        for (i=0; i<21; i++){
            pos1[i] = tableauCoupVictoire[i].slice(0,1) 
        } // récupere la valeur en première position de chaque array
        for (i=0; i<21; i++){
            pos2[i] = tableauCoupVictoire[i].slice(1,2)  
        } // récupere la valeur en deuxième position de chaque array
        for (i=0; i<21; i++){
            pos3[i] = tableauCoupVictoire[i].slice(-1) 
        } // récupere la valeur en dernière position de chaque array
        for(i=0; i<21; i++){
            if(etatJeu[pos1[i]] =="O" && etatJeu[pos2[i]] =="O" && etatJeu[pos3[i]] !=="X"){
            document.getElementById(pos3[i]).innerHTML="O"
            etatJeu[pos3[i]] ="O"
            verifGagne()
            return true}
        }
        return false
    }
    function unCoupObligé(){
        for (i=0; i<21; i++){
            pos1[i] = tableauCoupVictoire[i].slice(0,1) 
        }

        for (i=0; i<21; i++){
            pos2[i] = tableauCoupVictoire[i].slice(1,2)
        }
        for (i=0; i<21; i++){
            pos3[i] = tableauCoupVictoire[i].slice(-1)
        }
        for(i=0; i<21; i++){
            if(etatJeu[pos1[i]] =="X" && etatJeu[pos2[i]] =="X" && etatJeu[pos3[i]] !=="O"){
            document.getElementById(pos3[i]).innerHTML="O"
            etatJeu[pos3[i]] ="O"
            verifGagne()
            return true}
        }
        return false
    }
    function tuPerd(){
        for (i=0; i<4; i++){
            item1[i] = tableauTuPerd[i].slice(0,1)
        }
        for (i=0; i<4; i++){
            item2[i] = tableauTuPerd[i].slice(1,2)
        }
        for (i=0; i<4; i++){
            item3[i] = tableauTuPerd[i].slice(-1)
        }
        if(etatJeu[4] == "X"){
            for(i=0; i<4; i++){
                if(etatJeu[item1[i]] =="X" && etatJeu[item2[i]] =="X" && etatJeu[item3[i]] !=="O"){
                document.getElementById(item3[i]).innerHTML="O"
                etatJeu[item3[i]] ="O"
            verifGagne()
            return true}
                             }
                            }
        else{return false}
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
     di.id = i
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
