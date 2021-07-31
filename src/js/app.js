const cells = document.querySelectorAll(".cell");
const skew = document.querySelector("input");
const grid = document.querySelector(".grid");
const checkbox = document.querySelector("#switch");
checkbox.checked = false;
skew.value = 0;
grid.style.transform = `skewY(${skew.value}deg)`;
document.querySelector("button").addEventListener("click", () => {window.location.reload()})

let gameState = true;

let game = true;

let AIMode = false;

let template = [-1, -1, -1,
                -1, -1, -1,
                -1, -1, -1]

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (AIMode) {
            playAITurn(cell)
        } else if (!AIMode) {playTurn(cell)}
    });
})

skew.addEventListener("input", () => {
    grid.style.transform = `skewY(${skew.value}deg)`
})

checkbox.addEventListener("change", () => {
    toggleAIMode()
})

function playTurn(cell) {
    if (!game) {return}
    if (checkCell(cell)) {
        innerCase(cell)
        replaceTemplate(cell)
        toggleState()
        checkTurnState()
    } else {return}
}

function playAITurn(cell) {
    if (!game) {return}
    if (checkCell(cell)) {
        innerCase(cell)
        replaceTemplate(cell)
        toggleState()
        checkTurnState()
    } else {return}
    if (!game) {return}
    innerAIcase()
}

function innerAIcase() {
    let AICell = getRandomCell()
    if (checkCell(AICell)) {
        setTimeout(() => {
            innerCase(AICell)
            replaceTemplate(AICell)
            toggleState()
            checkTurnState()
        }, 750)
    } else if (!checkCell(AICell)) {
        innerAIcase()
    }
}

function innerCase(cell) {
    if (gameState) {
        cell.innerHTML = "X"
    } else if (!gameState) {
        cell.innerHTML = "O"
    }
}

function checkTurnState() {
    if (checkWin()) {
        swal("Bien joué !", "Un des joueurs à gagné", "success");
        game = false;
    } else if (checkEquality()) {
        swal("Égalité", "Aucun des joueurs n'a gagné");
        game = false;
    }
}

function checkCell(cell) {
    if (cell.innerHTML === "" || cell.innerHTML === undefined) {
        return true;
    } else {
        return false;
    }
}

function toggleState() {
    if (gameState) {
        gameState = false;
    } else if (!gameState) {
        gameState = true;
    }
}

function replaceTemplate(cell) {
    if (gameState) {
        return template[cell.dataset.index] = 1;
    } else if (!gameState) {
        return template[cell.dataset.index] = 0;
    }
}

function checkWin() {
    if (template[0] === template[1] && template[0] === template[2] && template[0] !== -1) {
        return true;
    } if (template[3] === template[4] && template[3] === template[5] && template[3] !== -1) {
        return true;
    } if (template[6] === template[7] && template[6] === template[8] && template[6] !== -1) {
        return true;
    } if (template[0] === template[3] && template[0] === template[6] && template[0] !== -1) {
        return true;
    } if (template[1] === template[4] && template[1] === template[7] && template[1] !== -1) {
        return true;
    } if (template[2] === template[5] && template[2] === template[8] && template[2] !== -1) {
        return true;
    } if (template[0] === template[4] && template[0] === template[8] && template[0] !== -1) {
        return true;
    } if (template[2] === template[4] && template[2] === template[6] && template[2] !== -1) {
        return true;
    }
}

function checkEquality() {
    if (template.includes(-1)) {
        return false;
    } else {
        return true;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomCell() {
    return document.querySelector(`.cell[data-index="${getRandomInt(8)}"]`)
}

function toggleAIMode() {
    if (AIMode) {
        AIMode = false;
    } else if (!AIMode) {
        AIMode = true;
    }
}