/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { spawn } from '@kapeta/nodejs-process';
import { disableConsoleWhile } from '../console-overrides';
import { resolveKapetaVariables } from '../variable-resolver';

export async function run(cmd: string, args: string[]) {
    try {
        const kapetaVariables = await disableConsoleWhile(resolveKapetaVariables);
        const child = spawn(cmd, args, {
            env: {
                ...kapetaVariables,
                ...process.env,
            },
            stdio: 'pipe',
            shell: true,
        });
        child.process.stdout?.pipe(process.stdout);
        child.process.stderr?.pipe(process.stderr);
        if (child.process.stdin) {
            process.stdin.pipe(child.process.stdin)
        }
        child.process.on('exit', (code, signal) => {
            process.exit(code || signal ? 1 : 0);
        });
        await child.wait();
    } catch (e: any) {
        console.error('Failed to run command: %s', e.message);
    }
}
