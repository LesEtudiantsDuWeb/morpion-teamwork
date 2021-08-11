declare class Case {
    private _defaultValue;
    private _value;
    private _position;
    private _numColumn;
    private _numLine;
    private _element;
    private _events;
    private _colorPlayers;
    constructor(position: number, nbColumns: number, defaultValue: number | undefined, colorPlayers: string[]);
    get element(): HTMLDivElement;
    get value(): number;
    set value(value: number);
    setValue(value: number, content: string): void;
    private createCase;
    remove(): void;
    private removeCase;
    removeEvents(): void;
    addEvent(type: string, func: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    isEmpty(): boolean;
    private changeCaseColor;
}
export default Case;
