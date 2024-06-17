import winstonLog from "../utils/logger/index.js";
function sum() {
    let counter = 0;
    for (let i = 0; i < 5e9; i++) {
      counter++;
    }
    return counter;
  }
  
  process.on("message", () => {
    const result = sum();
    winstonLog.INFO("child process id: from sum " + process.pid);
    process.send(result);
  });