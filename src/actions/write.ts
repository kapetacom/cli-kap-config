/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { disableConsoleWhile } from '../console-overrides';
import { resolveKapetaVariables } from '../variable-resolver';
import { writeConfigTemplates } from '../config-resolver';
import Path from 'path';
import FS from 'node:fs/promises';

const DOTENV_FILE = '.env';

export async function write() {
    try {
        const kapetaVariables = await resolveKapetaVariables();
        let dotEnv = '';
        Object.entries(kapetaVariables).forEach(([key, value]) => {
            dotEnv += `${key}=${JSON.stringify(value)}\n`;
        });
        const dotEnvPath = Path.join(process.cwd(), DOTENV_FILE);
        console.log('Writing environment variables to %s', DOTENV_FILE);
        await FS.writeFile(dotEnvPath, dotEnv);

        await writeConfigTemplates(kapetaVariables);
    } catch (e: any) {
        console.error('Failed to write configuration: %s', e.message);
    }
}
