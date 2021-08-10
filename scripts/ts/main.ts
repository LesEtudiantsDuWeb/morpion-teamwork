import Game from './Game.js';
import * as Utils from './utils.js';

(async () => {
    // Génération d'une partie de Morpion
    const container = document.querySelector('#morpion') as HTMLElement;
    const nbCol: number = 4;
    const nbLig: number = 4;
    const chainSizeToWin: number = 3;

    const svgCross = await Utils.createSVG('cross.svg');
    const svgCircle = await Utils.createSVG('circle.svg');

    // const tabPlayersContent: any[] = ['X', 'O'];
    const tabPlayersContent: any[] = [svgCross, svgCircle];

    const Morpion: Game = new Game(container, nbCol, nbLig, chainSizeToWin, tabPlayersContent);

    document.querySelector('#btn_launch')?.addEventListener('click', () => Morpion.launch());
})();
