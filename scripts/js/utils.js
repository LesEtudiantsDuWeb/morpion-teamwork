export const createArrayOfValues = (nbElements, defaultValue) => Array.from(Array(nbElements), () => defaultValue);
export const createArrayOfKeys = (nbElements) => Array.from(Array(nbElements), (_, x) => x);
export const setVisible = (element, visible) => {
    visible ? element.classList.remove('hidden') : element.classList.add('hidden');
};
