/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

const oldConsoleLog = console.log.bind(console);
const oldConsoleError = console.error.bind(console);
let consoleEnabled = true;
console.log = function (...args: any[]) {
    if (!consoleEnabled) {
        return;
    }
    oldConsoleLog(...args);
};

console.error = function (...args: any[]) {
    if (!consoleEnabled) {
        return;
    }
    oldConsoleError(...args);
};

export function disableConsole() {
    consoleEnabled = false;
}

export function enableConsole() {
    consoleEnabled = true;
}

export async function disableConsoleWhile<T>(func: () => T | Promise<T>): Promise<T> {
    disableConsole();
    try {
        return await func();
    } finally {
        enableConsole();
    }
}
