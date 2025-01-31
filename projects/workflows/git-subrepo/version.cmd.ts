/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: version.cmd.ts
 * Path: \projects\workflows\git-subrepo\version.cmd.ts
 * Created Date: Tuesday, December 19th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 - 2024 Eventiva - All Rights Reserved
 * LICENSE: GNU General Public License v3.0 only (GPL-3.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is
 * licensed for copying, distribution and modification under the terms of
 * the GNU General Public License v3.0 only (GPL-3.0) published as the License,
 * or (at your option) any later version of this license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Creative Commons Zero v1.0 Universal for more details.
 *
 * You should have received a copy of the GNU General Public License v3.0 only
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 * -----
 * Last Modified: Sat Jan 06 2024
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 */

import { Command } from '@teambit/cli';
import chalk from 'chalk';
import type { GitSubrepoMain } from './git-subrepo.main.runtime';

/**
 * The command name for the version command.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"version"}
 */
const COMMAND_NAME = 'version';

/**
 * This class represents the version command for git-subrepo. It implements the Command interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class versionCmd
 * @typedef {VersionCmd}
 * @implements {Command}
 */
export class VersionCmd implements Command {
  /**
   * The name property represents the command name with optional flags. The command name is a string obtained by concatenation of the constant COMMAND_NAME with optional flags. The optional flags are -q and -v, which represent quiet and verbose respectively. The resulting string can be used as the command name for executing a specific command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} [-q|-v]`;

  /**
   * The alias of the object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * This command will display version information about git-subrepo and its environment. For just the version number, use git subrepo --version. Use --verbose for more version info, and --quiet for less.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `This command will display version information about git-subrepo and its environment. For just the version number, use git subrepo --version. Use --verbose for more version info, and --quiet for less.`;

  /**
   * The 'options' property is used to access the subrepo options of the current instance. It is a reference to the 'subrepoOptions' property of the 'subrepo' object of the current instance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the group of the git repository.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The `private` property is a boolean value indicating whether the property should be considered as private or not. If set to `true`, the property is considered private; otherwise, if set to `false`, the property is considered public.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL for the help page of the tool or library. It points to the corresponding documentation on the GitHub repository.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of versionCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The GitSubrepoMain instance representing the subrepository.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the version of the subrepo using the given flags.
   * If the version is retrieved successfully, returns a green-colored message indicating success.
   * If the version retrieval fails, returns a red-colored message indicating failure.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings
   * @param {string[]} flags An array of strings
   * @returns {unknown} A function that reports the version of a git subrepo using the provided flags.
   */
  async report(flags: string[]) {
    const res = await this.subrepo.version(flags);
    if (res) {
      return chalk.green('git subrepo version was successful');
    }
    return chalk.red('git subrepo version was unsuccessful');
  }
}
