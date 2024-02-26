/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { runWithConfig} from '@kapeta/config-mapper';

export async function run(cmd: string, args: string[]) {
    try {
        const child = await runWithConfig(cmd, args);
        child.process.stdout?.pipe(process.stdout);
        child.process.stderr?.pipe(process.stderr);
        if (child.process.stdin) {
            process.stdin.pipe(child.process.stdin);
        }
        child.process.on('exit', (code, signal) => {
            process.exitCode = code || signal ? 1 : 0;
        });
        await child.wait();
    } catch (e: any) {
        console.error('Failed to run command: %s', e.message);
        process.exitCode = 1;
    }
}
