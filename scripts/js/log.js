export class Logger {
    static log(...message) {
        console.log(...message);
    }
    static group(name, ...messages) {
        console.group(name);
        messages.forEach((message) => Logger.log(message));
        console.groupEnd();
    }
}
