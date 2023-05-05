/**
 * @jest-environment jsdom
 */

import logger from "./logger";

const debug = jest.fn().mockImplementation(value => value);
const error = jest.fn().mockImplementation(value => value);
const info = jest.fn().mockImplementation(value => value);
const log = jest.fn().mockImplementation(value => value);
const trace = jest.fn().mockImplementation(value => value);
const warn = jest.fn().mockImplementation(value => value);

console.debug = debug;
console.error = error;
console.info = info;
console.log = log;
console.trace = trace;
console.warn = warn;

const c = {...console};
const expectedText = "Hello, world!";

describe("console is not null", () => {
    afterEach(() => {
        debug.mockClear();
        error.mockClear();
        info.mockClear();
        log.mockClear();
        trace.mockClear();
        warn.mockClear();
    });

    test("debug", async () => {
        logger.debug(expectedText);

        expect(debug).toHaveBeenCalled();
        expect(debug).toHaveBeenCalledWith(expectedText);
    });

    test("error", async () => {
        logger.error(expectedText);

        expect(error).toHaveBeenCalled();
        expect(error).toHaveBeenCalledWith(expectedText);
    });

    test("info", async () => {
        logger.info(expectedText);

        expect(info).toHaveBeenCalled();
        expect(info).toHaveBeenCalledWith(expectedText);
    });

    test("log", async () => {
        logger.log(expectedText);

        expect(log).toHaveBeenCalled();
        expect(log).toHaveBeenCalledWith(expectedText);
    });

    test("trace", async () => {
        logger.trace(expectedText);

        expect(trace).toHaveBeenCalled();
        expect(trace).toHaveBeenCalledWith(expectedText);
    });

    test("warn", async () => {
        logger.warn(expectedText);

        expect(warn).toHaveBeenCalled();
        expect(warn).toHaveBeenCalledWith(expectedText);
    });
});

describe("console is null", () => {

    beforeEach(() => {
        // eslint-disable-next-line no-global-assign
        console = null;
    });
    afterEach(() => {
        // eslint-disable-next-line no-global-assign
        console = c;
    });

    test("debug", async () => {
        logger.debug(expectedText);

        expect(debug).not.toHaveBeenCalled();
    });

    test("error", async () => {
        logger.error(expectedText);

        expect(error).not.toHaveBeenCalled();
    });

    test("info", async () => {
        logger.info(expectedText);

        expect(info).not.toHaveBeenCalled();
    });

    test("log", async () => {
        logger.log(expectedText);

        expect(log).not.toHaveBeenCalled();
    });

    test("trace", async () => {
        logger.trace(expectedText);

        expect(trace).not.toHaveBeenCalled();
    });

    test("warn", async () => {
        logger.warn(expectedText);

        expect(warn).not.toHaveBeenCalled();
    });
});