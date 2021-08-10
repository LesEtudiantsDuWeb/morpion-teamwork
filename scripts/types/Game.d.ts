declare class Game {
    private container;
    private elements;
    private nbCol;
    private nbLig;
    private nbCases;
    private tabCases;
    private playerTurn;
    private tabPlayersContent;
    private tabKeys;
    private tabKeysCol;
    private tabKeysLig;
    private chainSizeToWin;
    private tabVictories;
    constructor(container: HTMLElement, nbCol: number, nbLig: number, chainSizeToWin: number);
    launch(): void;
    private init;
    private addCases;
    private removeCases;
    private getValueOfCase;
    private getValueOfCases;
    private getCaseNumber;
    setRootVariables(): void;
    private getNumColumn;
    private getNumLine;
    private getPosition;
    private createEvents;
    private handleClick;
    private setPlayerTurn;
    private checkCompleted;
    private checkVictory;
    private showEnd;
    private hideEnd;
    private generateVictories;
    private generateVictoriesLinesAndColumns;
    private generateVictoriesDiagonales;
}
export default Game;
