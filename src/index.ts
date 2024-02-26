/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import KapetaCommand from '@kapeta/kap-command';

import packageData from '../package.json';
import { run } from './actions/run';
import { write } from './actions/write';
import { showEnv } from './actions/show-env';
import { showConfig } from './actions/show-config';

const command = new KapetaCommand('config', packageData.version);
command
    .program()
    .command('show-config')
    .description('Show the configuration files for the kapeta block in the current directory')
    .action(showConfig);

command
    .program()
    .command('show-env')
    .description('Show the environment variables for the kapeta block in the current directory')
    .action(showEnv);

command
    .program()
    .command('write')
    .description('Write a dotenv file and config files for the kapeta block in the current directory')
    .action(write);

command
    .program()
    .command('run <cmd> [args...]')
    .description('Run a command with the correct configuration for the kapeta block in the current directory')
    .action(run);

command.start();
