const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("customEvent", () => console.log("Got event!"));
emitter.emit("customEvent");
