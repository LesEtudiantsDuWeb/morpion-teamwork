import Game from "./Game.js";

// Génération d'une partie de Morpion
const container = document.querySelector("#morpion") as HTMLElement;
const nbCol: number = 3;
const nbLig: number = 3;
const Morpion: Game = new Game(container, nbCol, nbLig);

document
  .querySelector("#btn_launch")
  ?.addEventListener("click", () => Morpion.launch());
