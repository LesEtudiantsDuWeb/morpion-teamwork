import * as Utils from './utils.js';
import { Logger } from './log.js';
class Game {
    constructor(container, nbCol, nbLig, chainSizeToWin, tabPlayersContent) {
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
        this.tabPlayersContent = tabPlayersContent;
        this.tabKeys = Utils.createArrayOfKeys(this.nbCases);
        this.tabKeysCol = this.tabKeys.slice(0, this.nbCol);
        this.tabKeysLig = this.tabKeys.slice(0, this.nbLig).map((x) => x * this.nbCol);
        this.chainSizeToWin = chainSizeToWin;
        this.tabVictories = this.generateVictories();
        Logger.log('Game created');
    }
    launch() {
        this.init();
        this.hideEnd();
    }
    init() {
        this.removeCases();
        this.setRootVariables();
        this.tabCases = Utils.createArrayOfCases(this.nbCases, -1, this.nbCol);
        this.addCases();
        this.createEvents();
        this.playerTurn = Math.floor(Math.random() * 2);
        Logger.log('Game launched');
    }
    addCases() {
        this.tabCases.forEach((uneCase) => this.container.appendChild(uneCase.element));
    }
    removeCases() {
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
    setRootVariables() {
        this.container.style.setProperty('--nbLines', this.nbLig.toString());
        this.container.style.setProperty('--nbColumns', this.nbCol.toString());
    }
    getNumColumn(position) {
        return (position + this.nbCol) % this.nbCol;
    }
    getNumLine(position) {
        return Math.floor(position / this.nbCol);
    }
    getPosition(numColumn, numLine, nbColumns) {
        return numColumn + numLine * nbColumns;
    }
    createEvents() {
        this.tabCases.forEach((uneCase) => uneCase.addEvent('click', (event) => this.handleClick(event), {
            once: true,
        }));
    }
    handleClick(event) {
        if (!(event === null || event === void 0 ? void 0 : event.target))
            return;
        const target = event.target;
        const caseNumber = this.getCaseNumber(target);
        if (typeof caseNumber === 'undefined')
            return;
        this.tabCases[caseNumber].value = this.playerTurn;
        target.innerHTML = this.tabPlayersContent[this.playerTurn];
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
    generateVictories() {
        let tabVictories = [];
        tabVictories.push(...this.generateVictoriesLinesAndColumns(this.tabKeysLig, 1, 1, this.chainSizeToWin, true, this.nbCol));
        tabVictories.push(...this.generateVictoriesLinesAndColumns(this.tabKeysCol, this.nbLig, this.nbCol, this.nbCol * (this.chainSizeToWin - 1), false, this.nbCases - 1));
        tabVictories.push(...this.generateVictoriesDiagonales());
        Logger.group('tabVictories : ' + tabVictories.length, ...tabVictories);
        return tabVictories;
    }
    generateVictoriesLinesAndColumns(array, iInc, jMul, dynaVal, addArrayValueRightValue, incRightValue) {
        return (array
            .map((arrayValue) => {
            let tab = [];
            for (let i = 0; arrayValue + i + dynaVal <= (addArrayValueRightValue ? arrayValue : 0) + incRightValue; i += iInc) {
                tab.push(Array.from(Array(this.chainSizeToWin), (_, j) => arrayValue + j * jMul + i));
            }
            return tab;
        })
            .reduce((acc, cur) => acc.concat(cur), []));
    }
    generateVictoriesDiagonales() {
        return [
            ...this.tabKeys
                .filter((x) => this.getNumColumn(x) + this.chainSizeToWin <= this.nbCol)
                .map((x) => Array.from(Array(this.chainSizeToWin), (_, i) => x + i * (this.nbCol + 1)))
                .filter((tab) => tab.every((n) => n < this.nbCases)),
            ...this.tabKeys
                .filter((x) => this.getNumColumn(x) - this.chainSizeToWin + 1 >= 0)
                .map((x) => Array.from(Array(this.chainSizeToWin), (_, i) => x + i * (this.nbCol - 1)))
                .filter((tab) => tab.every((n) => n > 0 && n < this.nbCases)),
        ];
    }
}
export default Game;
