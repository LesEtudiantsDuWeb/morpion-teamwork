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
            unItemVide();
                return null
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
        if(etatJeu[0] == "O" && etatJeu[3] =="O" && etatJeu[6] !=="X"){
            document.getElementById("6").innerHTML="O"
            etatJeu[6] = "O"
            verifGagne()
            return true}
        if(etatJeu[0] == "O" && etatJeu[1] =="O" && etatJeu[2] !=="X"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[0] == "O" && etatJeu[4] =="O" && etatJeu[8] !=="X"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "O" && etatJeu[1] =="O" && etatJeu[0] !=="X"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "O" && etatJeu[4] =="O" && etatJeu[6] !=="X"){
                document.getElementById("6").innerHTML="O"
                etatJeu[6] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "O" && etatJeu[5] =="O" && etatJeu[8] !=="X"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "O" && etatJeu[5] =="O" && etatJeu[2] !=="X"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "O" && etatJeu[4] =="O" && etatJeu[0] !=="X"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "O" && etatJeu[7] =="O" && etatJeu[6] !=="X"){
                document.getElementById("6").innerHTML="O"
                etatJeu[6] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "O" && etatJeu[3] =="O" && etatJeu[0] !=="X"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "O" && etatJeu[4] =="O" && etatJeu[2] !=="X"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "O" && etatJeu[7] =="O" && etatJeu[8] !=="X"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[1] == "O" && etatJeu[4] =="O" && etatJeu[7] !=="X"){
                document.getElementById("7").innerHTML="O"
                etatJeu[7] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "O" && etatJeu[1] =="O" && etatJeu[7] !=="X"){
                document.getElementById("7").innerHTML="O"
                etatJeu[7] = "O"
                verifGagne()
                return true}
        if(etatJeu[5] == "O" && etatJeu[4] =="O" && etatJeu[3] !=="X"){
                document.getElementById("3").innerHTML="O"
                etatJeu[3] = "O"
                return true}
        if(etatJeu[4] == "O" && etatJeu[5] =="O" && etatJeu[3] !=="X"){
                document.getElementById("3").innerHTML="O"
                etatJeu[3] = "O"
                verifGagne()
                return true}
        if(etatJeu[7] == "O" && etatJeu[4] =="O" && etatJeu[1] !=="X"){
                document.getElementById("1").innerHTML="O"
                etatJeu[1] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "O" && etatJeu[7] =="O" && etatJeu[1] !=="X"){
                document.getElementById("1").innerHTML="O"
                etatJeu[1] = "O"
                verifGagne()
                return true}
        if(etatJeu[3] == "O" && etatJeu[4] =="O" && etatJeu[5] !=="X"){
                document.getElementById("5").innerHTML="O"
                etatJeu[5] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "O" && etatJeu[3] =="O" && etatJeu[5] !=="X"){
            document.getElementById("5").innerHTML="O"
            etatJeu[5] = "O"
            verifGagne()
                return true}
        if(etatJeu[0] == "O" && etatJeu[2] =="O" && etatJeu[1] !=="X"){
            document.getElementById("1").innerHTML="O"
            etatJeu[1] = "O"
            verifGagne()
                return true}
        if(etatJeu[2] == "O" && etatJeu[8] =="O" && etatJeu[5] !=="X"){
            document.getElementById("5").innerHTML="O"
            etatJeu[5] = "O"
            verifGagne()
                return true}
        if(etatJeu[8] == "O" && etatJeu[6] =="O" && etatJeu[7] !=="X"){
            document.getElementById("7").innerHTML="O"
            etatJeu[7] = "O"
            verifGagne()
                return true}
        if(etatJeu[0] == "O" && etatJeu[6] =="O" && etatJeu[3] !=="X"){
            document.getElementById("3").innerHTML="O"
            etatJeu[3] = "O"
            verifGagne()
                return true}
        if(etatJeu[1] == "O" && etatJeu[7] =="O" && etatJeu[4] !=="X"){
            document.getElementById("4").innerHTML="O"
            etatJeu[4] = "O"
            verifGagne()
                return true}
        if(etatJeu[5] == "O" && etatJeu[3] =="O" && etatJeu[4] !=="X"){
            document.getElementById("4").innerHTML="O"
            etatJeu[4] = "O"
            verifGagne()
                return true}
        else{return false}
    }



    function unCoupObligé(){
          
        if(etatJeu[0] == "X" && etatJeu[3] =="X" && etatJeu[6] !=="O"){
            document.getElementById("6").innerHTML="O"
            etatJeu[6] = "O"
            verifGagne()
            return true}
        if(etatJeu[0] == "X" && etatJeu[1] =="X" && etatJeu[2] !=="O"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[0] == "X" && etatJeu[4] =="X" && etatJeu[8] !=="O"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "X" && etatJeu[1] =="X" && etatJeu[0] !=="O"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "X" && etatJeu[4] =="X" && etatJeu[6] !=="O"){
                document.getElementById("6").innerHTML="O"
                etatJeu[6] = "O"
                verifGagne()
                return true}
        if(etatJeu[2] == "X" && etatJeu[5] =="X" && etatJeu[8] !=="O"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "X" && etatJeu[5] =="X" && etatJeu[2] !=="O"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "X" && etatJeu[4] =="X" && etatJeu[0] !=="O"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[8] == "X" && etatJeu[7] =="X" && etatJeu[6] !=="O"){
                document.getElementById("6").innerHTML="O"
                etatJeu[6] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "X" && etatJeu[3] =="X" && etatJeu[0] !=="O"){
                document.getElementById("0").innerHTML="O"
                etatJeu[0] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "X" && etatJeu[4] =="X" && etatJeu[2] !=="O"){
                document.getElementById("2").innerHTML="O"
                etatJeu[2] = "O"
                verifGagne()
                return true}
        if(etatJeu[6] == "X" && etatJeu[7] =="X" && etatJeu[8] !=="O"){
                document.getElementById("8").innerHTML="O"
                etatJeu[8] = "O"
                verifGagne()
                return true}
        if(etatJeu[1] == "X" && etatJeu[4] =="X" && etatJeu[7] !=="O"){
                document.getElementById("7").innerHTML="O"
                etatJeu[7] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "X" && etatJeu[1] =="X" && etatJeu[7] !=="O"){
                document.getElementById("7").innerHTML="O"
                etatJeu[7] = "O"
                verifGagne()
                return true}
        if(etatJeu[5] == "X" && etatJeu[4] =="X" && etatJeu[3] !=="O"){
                document.getElementById("3").innerHTML="O"
                etatJeu[3] = "O"
                return true}
        if(etatJeu[4] == "X" && etatJeu[5] =="X" && etatJeu[3] !=="O"){
                document.getElementById("3").innerHTML="O"
                etatJeu[3] = "O"
                verifGagne()
                return true}
        if(etatJeu[7] == "X" && etatJeu[4] =="X" && etatJeu[1] !=="O"){
                document.getElementById("1").innerHTML="O"
                etatJeu[1] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "X" && etatJeu[7] =="X" && etatJeu[1] !=="O"){
                document.getElementById("1").innerHTML="O"
                etatJeu[1] = "O"
                verifGagne()
                return true}
        if(etatJeu[3] == "X" && etatJeu[4] =="X" && etatJeu[5] !=="O"){
                document.getElementById("5").innerHTML="O"
                etatJeu[5] = "O"
                verifGagne()
                return true}
        if(etatJeu[4] == "X" && etatJeu[3] =="X" && etatJeu[5] !=="O"){
            document.getElementById("5").innerHTML="O"
            etatJeu[5] = "O"
            verifGagne()
                return true}
        if(etatJeu[0] == "X" && etatJeu[6] =="X" && etatJeu[3] !=="O"){
            document.getElementById("3").innerHTML="O"
            etatJeu[3] = "O"
            verifGagne()
                return true}
        if(etatJeu[0] == "X" && etatJeu[2] =="X" && etatJeu[1] !=="O"){
            document.getElementById("1").innerHTML="O"
            etatJeu[1] = "O"
            verifGagne()
                return true}
        if(etatJeu[2] == "X" && etatJeu[8] =="X" && etatJeu[5] !=="O"){
            document.getElementById("5").innerHTML="O"
            etatJeu[5] = "O"
            verifGagne()
                return true}
        if(etatJeu[8] == "X" && etatJeu[6] =="X" && etatJeu[7] !=="O"){
            document.getElementById("7").innerHTML="O"
            etatJeu[7] = "O"
            verifGagne()
                return true}
        if(etatJeu[0] == "X" && etatJeu[6] =="X" && etatJeu[3] !=="O"){
            document.getElementById("3").innerHTML="O"
            etatJeu[3] = "O"
            verifGagne()
                return true}
        if(etatJeu[1] == "X" && etatJeu[7] =="X" && etatJeu[4] !=="O"){
            document.getElementById("4").innerHTML="O"
            etatJeu[4] = "O"
            verifGagne()
                return true}
        if(etatJeu[5] == "X" && etatJeu[3] =="X" && etatJeu[4] !=="O"){
            document.getElementById("4").innerHTML="O"
            etatJeu[4] = "O"
            verifGagne()
                return true}
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
