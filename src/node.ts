if (typeof window === "undefined") {
    // tslint:disable-next-line:no-var-requires
    (global as any).WebSocket = require("ws");
}

export * from "./index";
