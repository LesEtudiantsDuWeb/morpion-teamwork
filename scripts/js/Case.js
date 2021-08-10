class Case {
    constructor(position, nbColumns, defaultValue = -1) {
        this._defaultValue = defaultValue;
        this._value = defaultValue;
        this._position = position;
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
        this._value = value;
    }
    createCase() {
        const uneCase = document.createElement('div');
        uneCase.classList.add('case', 'is-clickable');
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
    }
    addEvent(type, func, options) {
        this._events.push({ type, func, options });
        this._element.addEventListener(type, func, options);
    }
    isEmpty() {
        return this._value === this._defaultValue;
    }
}
export default Case;
