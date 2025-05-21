const ENABLE_LOGGING = true;

export const logger = {
  log: (...args) => {
    if (ENABLE_LOGGING) console.log(...args);
  },
  warn: (...args) => {
    if (ENABLE_LOGGING) console.warn(...args);
  },
  error: (...args) => {
    if (ENABLE_LOGGING) console.error(...args);
  },
  info: (...args) => {
    if (ENABLE_LOGGING) console.info(...args);
  }
};
