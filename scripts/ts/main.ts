import Game from './Game.js';

// Génération d'une partie de Morpion
const container = document.querySelector('#morpion') as HTMLElement;
const nbCol: number = 4;
const nbLig: number = 4;
const chainSizeToWin: number = 3;
const Morpion: Game = new Game(container, nbCol, nbLig, chainSizeToWin);

document.querySelector('#btn_launch')?.addEventListener('click', () => Morpion.launch());
