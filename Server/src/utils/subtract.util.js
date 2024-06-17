import winstonLog from "../utils/logger/index.js";
function subtract() {
    let counter = 0;
    for (let i = 0; i < 5e9; i++) {
      counter--;
    }
    return counter;
  }
  
  process.on("message", () => {
    const result = subtract();
    winstonLog.INFO("child process id from substract: " + process.pid);
    process.send(result);
  });