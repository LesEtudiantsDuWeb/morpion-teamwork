import Game from './Game.js';
import * as Utils from './utils.js';

/** Génération d'une partie de MORPION */
const Morpion = async () => {
    const container = document.querySelector('#morpion') as HTMLElement;
    const nbCol: number = 3;
    const nbLig: number = 3;
    const chainSizeToWin: number = 3;

    const svgCross = await Utils.createSVG('./cross.svg');
    const svgCircle = await Utils.createSVG('./circle.svg');

    const tabPlayersContent: string[] = [svgCross, svgCircle];
    const tabPlayersName: string[] = ['Alpha', 'Beta'];
    const tabPlayersColor: string[] = [];

    const gravity = false;

    const Morpion: Game = new Game(
        container,
        nbCol,
        nbLig,
        chainSizeToWin,
        tabPlayersContent,
        tabPlayersName,
        tabPlayersColor,
        gravity
    );

    document.querySelector('#btn_launch')?.addEventListener('click', () => Morpion.launch());
    Morpion.launch();
};

const Puissance4 = async() => {
    const container = document.querySelector('#morpion') as HTMLElement;
    const nbCol: number = 7;
    const nbLig: number = 6;
    const chainSizeToWin: number = 4;

    const svgCircleFilled = await Utils.createSVG('./circle-filled.svg');

    const tabPlayersContent: string[] = [svgCircleFilled, svgCircleFilled];
    const tabPlayersName: string[] = ['Alpha', 'Beta'];
    const tabPlayersColor: string[] = ['yellow', 'red'];
    
    const gravity = true;

    const Puissance4: Game = new Game(
        container,
        nbCol,
        nbLig,
        chainSizeToWin,
        tabPlayersContent,
        tabPlayersName,
        tabPlayersColor,
        gravity
    );

    document.querySelector('#btn_launch')?.addEventListener('click', () => Puissance4.launch());
    Puissance4.launch();
};

// Morpion();
Puissance4();