var _a;
import Game from "./Game.js";
const container = document.querySelector("#morpion");
const nbCol = 4;
const nbLig = 4;
const Morpion = new Game(container, nbCol, nbLig);
(_a = document
    .querySelector("#btn_launch")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => Morpion.launch());
