const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../output/system.log");

/**
 * Write log to console + file
 */
function log(message, type = "INFO") {
  const timestamp = new Date().toISOString();

  const formatted = `[${timestamp}] [${type}] ${message}`;

  console.log(formatted);

  fs.appendFileSync(LOG_FILE, formatted + "\n");
}

/**
 * Clear logs (optional per run)
 */
function clearLogs() {
  if (fs.existsSync(LOG_FILE)) {
    fs.unlinkSync(LOG_FILE);
  }
}

/**
 * Error logger with stack trace
 */
function error(message, err = null) {
  const stack = err?.stack ? `\n${err.stack}` : "";
  log(`${message}${stack}`, "ERROR");
}

module.exports = {
  log,
  error,
  clearLogs
};
