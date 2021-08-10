import Case from './Case.js';

/**
 * Génère un tableau de valeurs avec une valeur par défaut
 * @param nbElements Représente le nombre de valeurs souhtaitées
 * @param defaultValue Valeur par défaut affectée à toutes les cases du tableau
 */
export const createArrayOfValues = (nbElements: number, defaultValue: number): number[] =>
    Array.from(Array(nbElements), () => defaultValue);

export const createArrayOfCases = (
    nbElements: number,
    defaultValue: number,
    nbColumns: number,
): Case[] => Array.from(Array(nbElements), (_, i) => new Case(i, nbColumns, defaultValue));

/**
 * Génère un tableau de valeurs
 * @param nbElements Représente le nombre de valeurs souhtaitées
 */
export const createArrayOfKeys = (nbElements: number): number[] => Array.from(Array(nbElements), (_, x) => x);

/**
 * Affiche ou cache un élément
 * @param element Element à afficher ou cacher
 * @param visible True pour cacher, false sinon
 */
export const setVisible = (element: HTMLElement, visible: Boolean) => {
    visible ? element.classList.remove('hidden') : element.classList.add('hidden');
};
