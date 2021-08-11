class Case {
    constructor(position, nbColumns, defaultValue = -1, colorPlayers) {
        this._defaultValue = defaultValue;
        this._value = defaultValue;
        this._position = position;
        this._colorPlayers = colorPlayers;
        this._numColumn = (this._position + nbColumns) % nbColumns;
        this._numLine = Math.floor(this._position / nbColumns);
        this._element = this.createCase();
        this._events = new Array();
    }
    get element() {
        return this._element;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.element.classList.remove('is-clickable');
        this.changeCaseColor(this._colorPlayers[value]);
        this._value = value;
    }
    setValue(value, content) {
        this.element.classList.remove('is-clickable');
        this.changeCaseColor(this._colorPlayers[value]);
        this._value = value;
        this.element.innerHTML = content;
    }
    createCase() {
        const uneCase = document.createElement('div');
        uneCase.classList.add('case', 'is-clickable');
        uneCase.textContent = this._position.toString();
        if ((this._numColumn + this._numLine) % 2)
            uneCase.classList.add('odd');
        return uneCase;
    }
    remove() {
        this.removeEvents();
        this.removeCase();
    }
    removeCase() {
        this._element.remove();
    }
    removeEvents() {
        this._events.forEach((unEvent) => this._element.removeEventListener(unEvent.type, unEvent.func, unEvent === null || unEvent === void 0 ? void 0 : unEvent.options));
        this._events = [];
    }
    addEvent(type, func, options) {
        this._events.push({ type, func, options });
        this._element.addEventListener(type, func, options);
    }
    isEmpty() {
        return this._value === this._defaultValue;
    }
    changeCaseColor(colorPlayer) {
        this.element.style.color = colorPlayer;
    }
}
export default Case;
