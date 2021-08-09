import * as Utils from './utils.js';
class Game {
    constructor(container, nbCol, nbLig) {
        this.container = container;
        this.elements = {
            victory: document.querySelector('#victory'),
            draw: document.querySelector('#draw'),
            player: document.querySelector('#playerId'),
        };
        this.nbCol = nbCol;
        this.nbLig = nbLig;
        this.nbCases = nbLig * nbCol;
        this.tabCases = [];
        this.playerTurn = -1;
        this.tabPlayersContent = ['X', 'O'];
        this.tabKeys = Utils.createArrayOfKeys(this.nbCases);
        this.tabKeysCol = this.tabKeys.slice(0, this.nbCol);
        this.tabKeysLig = this.tabKeys.slice(0, this.nbLig).map((x) => x * this.nbCol);
        this.chainLengthToWin = 3;
        this.tabVictories = [];
        this.generateArrayVictory();
    }
    init() {
        this.deleteCases();
        this.createCases();
        this.createEvents();
        this.playerTurn = Math.floor(Math.random() * 2);
        this.tabCases = Utils.createArrayOfCases(this.nbCases, -1);
    }
    launch() {
        this.init();
        this.hideEnd();
    }
    createCases() {
        this.tabCases.forEach(uneCase => this.container.appendChild(uneCase.element));
    }
    deleteCases() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
    getValueOfCase(i) {
        return this.tabCases[i].value;
    }
    getValueOfCases(cases) {
        return cases.map((uneCase) => this.getValueOfCase(uneCase));
    }
    getCaseNumber(laCase) {
        return [...document.querySelectorAll('.case')]
            .map((uneCase, i) => (uneCase === laCase ? i : -1))
            .filter((x) => x !== -1)
            .pop();
    }
    createEvents() {
        this.container.querySelectorAll('.case').forEach((uneCase) => {
            uneCase.addEventListener('click', (event) => this.handleClick(event), {
                once: true,
            });
        });
    }
    handleClick(event) {
        if (!(event === null || event === void 0 ? void 0 : event.target))
            return;
        const target = event.target;
        const caseNumber = this.getCaseNumber(target);
        if (typeof caseNumber === 'undefined')
            return;
        this.tabCases[caseNumber].value = this.playerTurn;
        target.textContent = this.tabPlayersContent[this.playerTurn];
        if (this.checkVictory()) {
            this.showEnd(this.playerTurn);
            return;
        }
        if (this.checkCompleted()) {
            this.showEnd(-1);
            return;
        }
        this.setPlayerTurn();
    }
    setPlayerTurn() {
        this.playerTurn = +!this.playerTurn;
    }
    checkCompleted() {
        return !this.tabCases.some((x) => x.isEmpty());
    }
    checkVictory() {
        return this.tabVictories.some((tabVictory) => this.getValueOfCases(tabVictory).every((x) => x === this.playerTurn));
    }
    showEnd(typeEnd) {
        Utils.setVisible(this.container, false);
        if (typeEnd === -1) {
            Utils.setVisible(this.elements.draw, true);
        }
        else {
            this.elements.player.textContent = this.playerTurn.toString();
            Utils.setVisible(this.elements.victory, true);
        }
    }
    hideEnd() {
        Utils.setVisible(this.container, true);
        Utils.setVisible(this.elements.draw, false);
        Utils.setVisible(this.elements.victory, false);
    }
    generateArrayVictory() {
        this.tabVictories.push(...this.tabKeysCol.map((x) => [x, x + 3, x + 6]));
        this.tabVictories.push(...this.tabKeysLig.map((x) => [x, x + 1, x + 2]));
        this.tabVictories.push(...this.tabKeysLig.filter((x) => x + this.nbCol <= this.nbCol).map((x) => [x, x + 4, x + 8]));
        this.tabVictories.push(...this.tabKeysLig.filter((x) => x - (this.nbCol - 1) * 2 >= 0).map((x) => [x, x - 2, x - 4]));
    }
}
export default Game;
