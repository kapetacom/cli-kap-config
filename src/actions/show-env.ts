/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { disableConsoleWhile } from '../console-overrides';
import { resolveKapetaVariables } from '@kapeta/config-mapper';

export async function showEnv() {
    try {
        const kapetaVariables = await disableConsoleWhile(resolveKapetaVariables);
        Object.entries(kapetaVariables).forEach(([key, value]) => {
            console.log('%s=%s', key, JSON.stringify(value));
        });
    } catch (e: any) {
        console.error('Failed to show configuration: %s', e.message);
        process.exitCode = 1;
    }
}
