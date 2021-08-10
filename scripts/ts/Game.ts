import * as Utils from './utils.js';
import { Logger } from './log.js';
import Case from './Case.js';

class Game {
    /** Élément qui contiendra toutes les cases du jeu */
    private container: HTMLElement;
    /** Éléments DOM du jeu */
    private elements: { victory: HTMLElement; draw: HTMLElement; player: HTMLElement };
    /** Nombre de colonnes */
    private nbCol: number;
    /** Nombre de lignes */
    private nbLig: number;
    /** Nombre total de cases */
    private nbCases: number;
    /** Tableau contenant la valeur de chaque case : -1 pour case vide, 0 pour joueur 1, 1 pour joueur 2 */
    private tabCases: Case[];
    /** 0 signifie que c'est au joueur 1 de jouer, 1 signifie que c'est au joueur 2 de jouer */
    private playerTurn: number;
    /** Valeur affectée à la case cliquée par un joueur */
    private tabPlayersContent: string[];
    /** Tableaux contenant les positions */
    // private tabKeys: number[]; // TODO Delete, contenu dans tabCases
    /** Contient les id du début de chaque colonne */
    private tabKeysCol: number[];
    /** Contient les id du début de chaque ligne */
    private tabKeysLig: number[];
    /** Nombre de cases à aligner pour gagner */
    private chainSizeToWin: number;
    /** Contient l'ensemble des combinaisons de victoire */
    private tabVictories: number[][];

    constructor(container: HTMLElement, nbCol: number, nbLig: number) {
        this.container = container;
        this.elements = {
            victory: document.querySelector('#victory') as HTMLElement,
            draw: document.querySelector('#draw') as HTMLElement,
            player: document.querySelector('#playerId') as HTMLElement,
        };
        this.nbCol = nbCol;
        this.nbLig = nbLig;
        this.nbCases = nbLig * nbCol;

        this.tabCases = [];
        this.playerTurn = -1;
        this.tabPlayersContent = ['X', 'O'];

        // Génère un tableau temporaire pour récupérer les positions de début de colonne et début de ligne
        const tabKeys = Utils.createArrayOfKeys(this.nbCases);
        this.tabKeysCol = tabKeys.slice(0, this.nbCol);
        this.tabKeysLig = tabKeys.slice(0, this.nbLig).map((x) => x * this.nbCol);

        this.chainSizeToWin = 4;
        this.tabVictories = this.generateArrayVictory();

        Logger.log('Game created');
    }

    /** Démarre une nouvelle partie */
    public launch(): void {
        this.init();
        this.hideEnd();
    }

    /** Initialise les valeurs pour commencer une partie */
    private init(): void {
        // Utile si ce n'est pas la première partie
        this.removeCases();

        this.setRootVariables();
        // génère un tableau de Case avec comme valeur par défaut -1
        this.tabCases = Utils.createArrayOfCases(this.nbCases, -1, this.nbCol, this.nbLig);
        this.addCases();
        this.createEvents();

        // détermine qui commence
        this.playerTurn = Math.floor(Math.random() * 2);

        Logger.log('initilized');
    }

    /****************
     * Cases        *
     ****************/

    /** Crée un nombre de cases dans le DOM en fonction du nombre de cases dans le jeu */
    private addCases(): void {
        this.tabCases.forEach((uneCase) => this.container.appendChild(uneCase.element));
    }

    /** Supprimes les cases du jeu */
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

    /*****************
     * Events        *
     *****************/

    /** Génère l'ensemble des événements sur les cases */
    private createEvents(): void {
        this.tabCases.forEach((uneCase) =>
            uneCase.addEvent('click', (event) => this.handleClick(event), {
                once: true,
            }),
        );
    }

    /** Événement qui s'active lorsqu'on clique sur une case */
    private handleClick(event: Event & { target: EventTarget | null }) {
        if (!event?.target) return;

        const target = event.target as HTMLDivElement;
        const caseNumber = this.getCaseNumber(target);
        if (typeof caseNumber === 'undefined') return;

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

    /** Change le tour du joueur */
    private setPlayerTurn(): void {
        this.playerTurn = +!this.playerTurn;
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
        return this.tabVictories.some((tabVictory) =>
            this.getValueOfCases(tabVictory).every((x) => x === this.playerTurn),
        );
    }

    /** Montre l'écran de fin de partie */
    private showEnd(typeEnd: number) {
        Utils.setVisible(this.container, false);

        if (typeEnd === -1) {
            Utils.setVisible(this.elements.draw, true);
        } else {
            this.elements.player.textContent = this.playerTurn.toString();
            Utils.setVisible(this.elements.victory, true);
        }
    }

    /** Cache l'écran de fin */
    private hideEnd() {
        Utils.setVisible(this.container, true);
        Utils.setVisible(this.elements.draw, false);
        Utils.setVisible(this.elements.victory, false);
    }

    /************************
     * Generation victories *
     ************************/

    /** Génère le tableau contenant toutes les possibilités de victoire */
    private generateArrayVictory(): number[][] {
        let tabVictories = [];

        // victoires liées aux lignes et colonnes
        // tabVictories.push(...this.tabKeysLig.map((x) => [x, x + 1, x + 2]));

        // Victoires liées aux cases alignées sur une ligne
        tabVictories.push(
            ...this.tabKeysLig
                .map((x) => {
                    let i = 0;
                    let tab = [];
                    while (x + this.chainSizeToWin + i <= x + this.nbCol) {
                        tab.push(Array.from(Array(this.chainSizeToWin), (_, j) => x + j + i));
                        i++;
                    }
                    return tab;
                })
                .reduce((acc, cur) => acc.concat(cur), []),
        );

        // Victoires liées aux cases alignées sur une colonne
        tabVictories.push(
            ...this.tabKeysCol
                .map((x) => {
                    let i = 0;
                    let tab = [];
                    while (x + this.chainSizeToWin * (this.chainSizeToWin - 1) + i <= this.nbCases - 1) {
                        tab.push(Array.from(Array(this.chainSizeToWin), (_, j) => x + j*this.chainSizeToWin + i));
                        i += this.chainSizeToWin;
                    }
                    return tab;
                })
                .reduce((acc, cur) => acc.concat(cur), []),
        );

        // tabVictories.push(...this.tabKeysCol.map((x) => [x, x + 3, x + 6]));
        // victoires liées aux diagonales (j'ai peu testé celles ci donc à vérifier )
        // tabVictories.push(...this.tabKeysLig.filter((x) => x + this.nbCol <= this.nbCol).map((x) => [x, x + 4, x + 8]));
        // tabVictories.push(
        //     ...this.tabKeysLig.filter((x) => x - (this.nbCol - 1) * 2 >= 0).map((x) => [x, x - 2, x - 4]),
        // );

        Logger.group('tab', [tabVictories]);

        return tabVictories;
    }
}

export default Game;
