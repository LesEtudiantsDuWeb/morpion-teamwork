var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from './Game.js';
import * as Utils from './utils.js';
const Morpion = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const container = document.querySelector('#morpion');
    const nbCol = 3;
    const nbLig = 3;
    const chainSizeToWin = 3;
    const svgCross = yield Utils.createSVG('./cross.svg');
    const svgCircle = yield Utils.createSVG('./circle.svg');
    const tabPlayersContent = [svgCross, svgCircle];
    const tabPlayersName = ['Alpha', 'Beta'];
    const tabPlayersColor = [];
    const Morpion = new Game(container, nbCol, nbLig, chainSizeToWin, tabPlayersContent, tabPlayersName, tabPlayersColor);
    (_a = document.querySelector('#btn_launch')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => Morpion.launch());
});
const Puissance4 = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const container = document.querySelector('#morpion');
    const nbCol = 7;
    const nbLig = 6;
    const chainSizeToWin = 4;
    const svgCircleFilled = yield Utils.createSVG('./circle-filled.svg');
    const tabPlayersContent = [svgCircleFilled, svgCircleFilled];
    const tabPlayersName = ['Alpha', 'Beta'];
    const tabPlayersColor = ['yellow', 'red'];
    const Morpion = new Game(container, nbCol, nbLig, chainSizeToWin, tabPlayersContent, tabPlayersName, tabPlayersColor);
    (_b = document.querySelector('#btn_launch')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => Morpion.launch());
});
Puissance4();
