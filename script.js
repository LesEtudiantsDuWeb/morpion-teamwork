let gameactivation = false;
let activeplayer = "X";
let gamestate = ["","","","","","","","",""];

// Fonctionnement de l'ordinateur

let random;
let emptyCell = "";

// Conditions de victoire

const victorytemplate = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Const score

const equaliy = "Personne n'a gagné, peut être la prochaine fois ?"



function newGame() {
    gameactivation = true;
    activeplayer= "X";
    gamestate = ["","","","","","","","",""];
    document.querySelectorAll(".cases").forEach(cell => cell.innerHTML = "");
    this.innerHTML = "Vider la grille ?"
}

document.querySelectorAll(".cases").forEach(cell => cell.addEventListener("click", clickCase))
document.querySelector("#launch").addEventListener("click", newGame)

// Récupération de la valeur de la case

function clickCase(){
    const caseIndex = parseInt(this.dataset.index)

    if(gamestate[caseIndex] !== "" || !gameactivation){
        return
    }

    gamestate[caseIndex] = activeplayer
    this.innerHTML = activeplayer

    victorycheck()
}

function victorycheck() {
    let victoryround = false

    for(let victorycondition of victorytemplate){
        let val1 = gamestate[victorycondition[0]]
        let val2 = gamestate[victorycondition[1]]
        let val3 = gamestate[victorycondition[2]]
        
        if(val1 === "" || val2 === "" || val3 === ""){
            continue    
        }
        if(val1 === val2 && val2 === val3){
                victoryround = true
                break
            }
        }
   
    if(victoryround){
        alert("Le joueur " + activeplayer + " a gagné, félicitation !")
        console.log("Le joueur " + activeplayer + " a gagné, félicitation !")
        gameactivation = false
        return
    } 

    if(!gamestate.includes("")){
        alert(equaliy)
        gameactivation = false
        return
    }

    activeplayer = activeplayer === "X" ? "O" : "X"
}

function computerRound(){
    random = Math.round(Math.random() * (8 - 0) + 0);
    console.log(random);

    if(gamestate[caseIndex] = emptyCell){
        this.innerHTML = activeplayer;
    }

}