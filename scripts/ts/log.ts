export class Logger {
    static log(...message: any[]) {
        console.log(...message);
    }

    static group(name: string, ...messages: any[]) {
        console.group(name);
        messages.forEach((message) => Logger.log(message));
        console.groupEnd();
    }
}
