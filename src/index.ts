/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */


import KapetaCommand from "@kapeta/kap-command";

import packageData from "../package.json";
import {show} from './actions/show';
import {run} from './actions/run';
import {write} from './actions/write';

const command = new KapetaCommand('config', packageData.version);
command.program()
    .command('show')
    .description('Show the configuration for the kapeta block in the current directory')
    .action(show);

command.program()
    .command('write')
    .description('Write a dotenv file and config files for the kapeta block in the current directory')
    .action(write);

command.program()
    .command('run <cmd> args...')
    .description('Run a command with the correct configuration for the kapeta block in the current directory')
    .action(run);

command.start();
