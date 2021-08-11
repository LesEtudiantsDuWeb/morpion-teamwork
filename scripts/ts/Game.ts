import * as Utils from './utils.js';
import { Logger } from './log.js';
import Case from './Case.js';

class Game {
    /** Élément qui contiendra toutes les cases du jeu */
    private container: HTMLElement;
    /** Éléments DOM du jeu */
    private elements: { victory: HTMLElement; draw: HTMLElement; player: HTMLElement; text: HTMLElement };
    /** Nombre de colonnes */
    private nbCol: number;
    /** Nombre de lignes */
    private nbLig: number;
    /** Nombre total de cases */
    private nbCases: number;
    /** Active ou non la gravité, c'est à dire que le pion tombe en base de la colonne */
    private gravity: boolean;
    /** Tableau contenant la valeur de chaque case : -1 pour case vide, 0 pour joueur 1, 1 pour joueur 2 */
    private tabCases: Case[];
    /** 0 signifie que c'est au joueur 1 de jouer, 1 signifie que c'est au joueur 2 de jouer */
    private playerTurn: number;
    /** Valeur affectée à la case cliquée par un joueur */
    private tabPlayersContent: any[];
    /** Nom des joueurs */
    private tabPlayersName: string[];
    /** Couleur des pions des joueurs */
    private tabPlayersColor: string[];
    /** Tableaux contenant les positions */
    private tabKeys: number[];
    /** Contient les id du début de chaque colonne */
    private tabKeysCol: number[];
    /** Contient les id du début de chaque ligne */
    private tabKeysLig: number[];
    /** Nombre de cases à aligner pour gagner */
    private chainSizeToWin: number;
    /** Contient l'ensemble des combinaisons de victoire */
    private tabVictories: number[][];
    /** Tableau contenant les cases quand un joueur gagne */
    private victoryCases: number[];

    constructor(
        container: HTMLElement,
        nbCol: number,
        nbLig: number,
        chainSizeToWin: number,
        tabPlayersContent: any[],
        tabPlayersName: string[],
        tabPlayersColor: string[] = [],
        gravity: boolean,
    ) {
        this.container = container;
        this.elements = {
            victory: document.querySelector('#victory') as HTMLElement,
            draw: document.querySelector('#draw') as HTMLElement,
            player: document.querySelector('#playerId') as HTMLElement,
            text: document.querySelector('#text') as HTMLElement,
        };
        this.nbCol = nbCol;
        this.nbLig = nbLig;
        this.nbCases = nbLig * nbCol;
        this.gravity = gravity;

        this.tabCases = [];
        this.playerTurn = -1;
        this.tabPlayersContent = tabPlayersContent;
        this.tabPlayersName = tabPlayersName;
        this.tabPlayersColor = tabPlayersColor;

        // Génère un tableau temporaire pour récupérer les positions de début de colonne et début de ligne
        this.tabKeys = Utils.createArrayOfKeys(this.nbCases);
        this.tabKeysCol = this.tabKeys.slice(0, this.nbCol);
        this.tabKeysLig = this.tabKeys.slice(0, this.nbLig).map((x) => x * this.nbCol);

        this.chainSizeToWin = chainSizeToWin;
        this.tabVictories = this.generateVictories();

        this.victoryCases = [];

        Logger.log('Game created');
    }

    /** Initialise les valeurs pour commencer une partie */
    public launch(): void {
        // Utile si ce n'est pas la première partie
        this.removeCases();

        this.setRootVariables();
        // Génère un tableau de Case avec comme valeur par défaut -1
        this.tabCases = Utils.createArrayOfCases(this.nbCases, -1, this.nbCol, this.tabPlayersColor);
        this.addCases();
        this.createEvents();

        // Détermine qui commence
        this.playerTurn = Math.floor(Math.random() * 2);
        this.elements.text.innerText = 'Au tour de ' + this.tabPlayersName[this.playerTurn];

        this.victoryCases = [];

        Logger.log('Game launched');
    }

    /****************
     * Cases        *
     ****************/

    /** Crée un nombre de cases dans le DOM en fonction du nombre de cases dans le jeu */
    private addCases(): void {
        this.tabCases.forEach((uneCase) => this.container.appendChild(uneCase.element));
    }

    /** Supprime les cases du jeu */
    private removeCases(): void {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

    /** Récupère le contenu d'une case */
    private getValueOfCase(i: number) {
        return this.tabCases[i].value;
    }

    /** Récupère la valeur d'un tableau de cases */
    private getValueOfCases(cases: number[]): number[] {
        return cases.map((uneCase) => this.getValueOfCase(uneCase));
    }

    /** Récupère le numéro d'une case */
    private getCaseNumber(laCase: HTMLDivElement): number | undefined {
        return [...document.querySelectorAll('.case')]
            .map((uneCase, i) => (uneCase === laCase ? i : -1))
            .filter((x) => x !== -1)
            .pop();
    }

    /** Modifie les variables css afin d'adapter la grille aux nombres de colonnes et de lignes */
    public setRootVariables(): void {
        this.container.style.setProperty('--nbLines', this.nbLig.toString());
        this.container.style.setProperty('--nbColumns', this.nbCol.toString());
    }

    /** Récupère le numéro de la colonne dans laquelle se trouve une position */
    private getNumColumn(position: number): number {
        return (position + this.nbCol) % this.nbCol;
    }

    /** Récupère le numéro de la ligne dans laquelle se trouve une position */
    private getNumLine(position: number): number {
        return Math.floor(position / this.nbCol);
    }

    /** R2cupère une position en fonction du numéro de la ligne et du numéro de la colonne */
    private getPosition(numColumn: number, numLine: number): number {
        return numColumn + numLine * this.nbCol;
    }

    private setCasesToVictory() {
        this.victoryCases.forEach((uneCase) => this.tabCases[uneCase].element.classList.add('victory'));
    }

    private getFirstFreeCaseInColumn(caseNumber: number) {
        return [...Array(this.nbLig).keys()]
            .reverse()
            .map((x) => this.tabCases[this.getPosition(this.getNumColumn(caseNumber), x)])
            .find((uneCase) => uneCase.isEmpty());
    }

    /*****************
     * Events        *
     *****************/

    /** Génère l'ensemble des événements sur les cases */
    private createEvents(): void {
        const options = this.gravity ? {} : { once: true };
        this.tabCases.forEach((uneCase) => uneCase.addEvent('click', (event) => this.handleClick(event), options));
    }

    /** Événement qui s'active lorsqu'on clique sur une case */
    private handleClick(event: Event & { target: EventTarget | null }) {
        if (!event?.target) return;

        const target = event.target as HTMLDivElement;
        const caseNumber = this.getCaseNumber(target);
        if (typeof caseNumber === 'undefined') return;

        /**
         * Parcours chaque ligne d'une colonne, en mode reverse
         * if la case isEmpty => changeValue
         * else nextLine
         */
        // [...Array(this.nbLig).keys()].reverse().forEach((x) => console.log('line', x));
        // console.log(
        //     'first line empty :',
        //     [...Array(this.nbLig).keys()]
        //         .reverse()
        //         .map((x) => this.tabCases[this.getPosition(this.getNumColumn(caseNumber), x)])
        //         // .map(x=> console.log(x))
        //         .find((uneCase) => uneCase.isEmpty()),
        // );
        const caseToModify = this.gravity ? this.getFirstFreeCaseInColumn(caseNumber) : this.tabCases[caseNumber];
        const caset = [...Array(this.nbLig).keys()]
            .reverse()
            .map((x) => this.tabCases[this.getPosition(this.getNumColumn(caseNumber), x)]);
        // .find((uneCase) => uneCase.isEmpty());

        console.log('caset', caset);
        console.log('caseToModify', caseToModify);

        // this.tabCases[caseNumber].value = this.playerTurn;
        // target.innerHTML = this.tabPlayersContent[this.playerTurn];
        // if (caseToModify) {
        //     caseToModify.value = this.playerTurn;

        //     caseToModify.element.innerHTML = this.tabPlayersContent[this.playerTurn];
        // }
        if (caseToModify) {
            caseToModify.setValue(this.playerTurn, this.tabPlayersContent[this.playerTurn]);
        }

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

    /** Change le tour du joueur */
    private setPlayerTurn(): void {
        this.playerTurn = +!this.playerTurn;
        this.elements.text.innerText = 'Au tour de ' + this.tabPlayersName[this.playerTurn];
    }

    /***********************
     * Fin de partie.      *
     ***********************/

    /** Vérifie s'il reste une case vide. Retourne true si toutes les cases sont complétées */
    private checkCompleted(): Boolean {
        return !this.tabCases.some((x) => x.isEmpty());
    }

    /** Verifie si un joueur a gagné */
    private checkVictory(): Boolean {
        return this.tabVictories.some((tabVictory) => {
            let victory = this.getValueOfCases(tabVictory).every((x) => x === this.playerTurn);
            if (victory) this.victoryCases = tabVictory;
            return victory;
        });
    }

    /** Montre l'écran de fin de partie */
    private showEnd(typeEnd: number) {
        console.log(this.victoryCases);

        if (typeEnd === -1) {
            this.elements.text.innerText = 'Égalité ! Pas de vainqueur !';
        } else {
            this.setCasesToVictory();
            this.elements.text.innerText = `Félicitation ! ${this.tabPlayersName[this.playerTurn]} a gagné la partie !`;
            this.tabCases.forEach((uneCase) => {
                uneCase.removeEvents();
                uneCase.element.classList.remove('is-clickable');
            });
        }
    }

    /************************
     * Generation victories *
     ************************/

    /** Génère le tableau contenant toutes les possibilités de victoire */
    private generateVictories(): number[][] {
        let tabVictories = [];

        // Victoires liées aux cases alignées sur une ligne
        tabVictories.push(
            ...this.generateVictoriesLinesAndColumns(this.tabKeysLig, 1, 1, this.chainSizeToWin, true, this.nbCol),
        );
        // Victoires liées aux cases alignées sur une colonne
        tabVictories.push(
            ...this.generateVictoriesLinesAndColumns(
                this.tabKeysCol,
                this.nbLig,
                this.nbCol,
                this.nbCol * (this.chainSizeToWin - 1),
                false,
                this.nbCases - 1,
            ),
        );

        // Victoires liées aux cases alignées en diagonale
        tabVictories.push(...this.generateVictoriesDiagonales());

        Logger.group('tabVictories : ' + tabVictories.length, ...tabVictories);

        return tabVictories;
    }

    /**
     * Génère un tableau de victoires
     * @param array Tableau contenant la première valeur de chaque ligne/colonne
     * @param iInc Valeur à incrémenter le i à chaque passage dans le for
     * @param jMul Valeur à multiplier le j à chaque passage dans le for
     * @param dynaVal Valeur dynamique utiliser pour la condition du for
     * @param addArrayValueRightValue Si vrai, on ajoute la valeur courante du tableau dans la condition de droite
     * @param incRightValue Valeur à ajouter dans la condition de droite
     */
    private generateVictoriesLinesAndColumns(
        array: number[],
        iInc: number,
        jMul: number,
        dynaVal: number,
        addArrayValueRightValue: boolean,
        incRightValue: number,
    ): number[][] {
        return (
            array
                .map((arrayValue) => {
                    let tab = [];
                    // Parcours chaque case de la ligne/colonne
                    // Afin de savoir si toutes les cases alignées sont contenues dans le tableau des cases
                    // Par exemple, si nous avons 9 cases, il ne faudrait pas une condition de victoire contenant la 10e case
                    // Le tableau retourné a la forme de [0,1,2], [1,2,3]
                    for (
                        let i = 0;
                        arrayValue + i + dynaVal <= (addArrayValueRightValue ? arrayValue : 0) + incRightValue;
                        i += iInc
                    ) {
                        tab.push(Array.from(Array(this.chainSizeToWin), (_, j) => arrayValue + j * jMul + i));
                    }
                    return tab;
                })
                // Le tableau retourné par map a la forme de [[[0,1,2], [1,2,3]], [[4,5,6], [5,6,7]]]
                // Reduce permet de fusionner les tableaux en 1 seul : [[0,1,2], [1,2,3], [4,5,6], [5,6,7]]
                .reduce((acc, cur) => acc.concat(cur), [])
        );
    }

    /** Génère un tableau de victoires en rapport avec les diagonales */
    private generateVictoriesDiagonales(): number[][] {
        // Tableau 1 : Diagonales vers la droite
        // Tableau 2 : Diagonales vers la gauche
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
