declare class Case {
    private _defaultValue;
    private _value;
    private _position;
    private _nbColumns;
    private _nbLines;
    private _element;
    private _events;
    constructor(position: number, nbColumns: number, nbLines: number, defaultValue?: number);
    get element(): HTMLDivElement;
    get value(): number;
    set value(value: number);
    private createCase;
    remove(): void;
    private removeCase;
    private removeEvents;
    addEvent(type: string, func: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    isEmpty(): boolean;
}
export default Case;
