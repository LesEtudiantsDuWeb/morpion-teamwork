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