let cells = document.querySelectorAll(".cell");

let gameState = true;

let template = [-1, -1, -1,
                -1, -1, -1,
                -1, -1, -1]

cells.forEach(cell => {
    cell.addEventListener("click", innerCase);
})

function innerCase() {
    if (checkCell(this) === true) {
        if (gameState === true) {
            this.innerHTML = "X"
        } else if (gameState === false) {
            this.innerHTML = "O"
        }
        replaceTemplate(this, template)
        console.log(template);
        toggleState()
        if (checkWin(template) === true) {
            alert("Win")
        }
    } else {
        return
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
    if (gameState === true) {
        gameState = false;
    } else if (gameState === false) {
        gameState = true;
    }
}

function replaceTemplate(cell, template) {
    if (gameState === true) {
        return template[cell.dataset.index] = 1;
    } else if (gameState === false) {
        return template[cell.dataset.index] = 0;
    }
}

function checkWin(template) {
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