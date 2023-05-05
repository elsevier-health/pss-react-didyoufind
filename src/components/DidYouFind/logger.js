const logger = {
    debug: (message) => console ? console.debug(message) : null,
    error: (message) => console ? console.error(message) : null,
    info: (message) => console ? console.info(message) : null,
    log: (message) => console ? console.log(message) : null,
    trace: (message) => console ? console.trace(message) : null,
    warn: (message) => console ? console.warn(message) : null,
};

export default logger;
