/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { writeConfig } from '@kapeta/config-mapper';

export async function write() {
    try {
        await writeConfig();
    } catch (e: any) {
        console.error('Failed to write configuration: %s', e.message);
    }
}
