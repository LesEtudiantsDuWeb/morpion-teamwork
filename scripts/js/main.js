var _a;
import Game from "./Game.js";
const container = document.querySelector("#morpion");
const nbCol = 3;
const nbLig = 3;
const Morpion = new Game(container, nbCol, nbLig);
(_a = document
    .querySelector("#btn_launch")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => Morpion.launch());
