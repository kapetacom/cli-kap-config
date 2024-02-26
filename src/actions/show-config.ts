/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { disableConsoleWhile } from '../console-overrides';
import { resolveKapetaVariables, renderConfigTemplates } from '@kapeta/config-mapper';

export async function showConfig() {
    try {
        const kapetaVariables = await disableConsoleWhile(resolveKapetaVariables);
        const renderedTemplates = await disableConsoleWhile(() => renderConfigTemplates(kapetaVariables));
        if (Object.keys(renderedTemplates).length > 0) {
            Object.entries(renderedTemplates).forEach(([path, value]) => {
                console.log('%s:\n%s\n\n', path, value);
            });
        } else {
            console.log('No configuration files to show');
        }
    } catch (e: any) {
        console.error('Failed to show configuration: %s', e.message);
        process.exitCode = 1;
    }
}
