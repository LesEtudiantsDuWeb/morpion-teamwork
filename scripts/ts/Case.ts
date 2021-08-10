import { Logger } from './log.js';
class Case {
    private _defaultValue: number;
    private _value: number;
    private _position: number;
    private _nbColumns: number;
    private _nbLines: number;
    private _element: HTMLDivElement;
    private _events: {
        type: string;
        func: EventListenerOrEventListenerObject;
        options?: boolean | AddEventListenerOptions | undefined;
    }[];

    constructor(position: number, nbColumns: number, nbLines: number, defaultValue: number = -1) {
        this._defaultValue = defaultValue;
        this._value = defaultValue;
        this._position = position;
        this._nbColumns = nbColumns;
        this._nbLines = nbLines;
        this._element = this.createCase();
        this._events = new Array();
    }

    public get element(): HTMLDivElement {
        return this._element;
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this.element.classList.remove('is-clickable');
        this._value = value;
    }

    /** Crée une case dans le DOM */
    private createCase(): HTMLDivElement {
        const uneCase = document.createElement('div');
        uneCase.classList.add('case', 'is-clickable');

        if (((this._position % this._nbColumns) + Math.floor(this._position / this._nbLines)) % 2)
            uneCase.classList.add('odd');

        return uneCase;
    }

    /** Supprime la case et ses events */
    public remove() {
        this.removeEvents();
        this.removeCase();
    }

    /** Supprime la case du DOM */
    private removeCase(): void {
        this._element.remove();
    }

    /** Supprime les events de la case */
    private removeEvents() {
        this._events.forEach((unEvent) =>
            this._element.removeEventListener(unEvent.type, unEvent.func, unEvent?.options),
        );
    }

    /** Ajoute un evenement à la case */
    public addEvent(
        type: string,
        func: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions | undefined,
    ) {
        this._events.push({ type, func, options });
        this._element.addEventListener(type, func, options);
        Logger.log('Event added');
    }

    /** Vérifie si la case est vide */
    public isEmpty(): boolean {
        return this._value === this._defaultValue;
    }
}

export default Case;
