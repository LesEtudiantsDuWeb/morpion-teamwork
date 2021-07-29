let cells = document.querySelectorAll(".cell");

let gameState = true;

let template = [-1, -1, -1,
                -1, -1, -1,
                -1, -1, -1]

cells.forEach(cell => {
    cell.addEventListener("click", innerCase);
})

function innerCase() {
    if (gameState === true) {
        console.log();
        this.innerHTML = "X"
    } else if (gameState === false) {
        this.innerHTML = "O"
    }
    toggleState()
}

function toggleState() {
    if (gameState === true) {
        gameState = false;
    } else if (gameState === false) {
        gameState = true;
    }
}