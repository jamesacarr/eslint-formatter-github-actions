import { startGroup, endGroup } from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';

import type { ESLint, Linter } from 'eslint';

// https://eslint.org/docs/4.0.0/user-guide/configuring#configuring-rules
// https://github.com/actions/toolkit/blob/main/docs/commands.md#log-level
const severityLabels: { [key in Linter.Severity]: string } = {
  0: 'debug',
  1: 'warning',
  2: 'error',
};

const GitHubActionsReporter: ESLint.Formatter = {
  format(results) {
    startGroup('Lint Annotations');

    const errors = results.flatMap(result =>
      result.messages.map(message => ({
        message: message.message,
        severity: severityLabels[message.severity],
        properties: {
          file: result.filePath,
          line: message.line.toString(),
          col: message.column.toString(),
        },
      }))
    );

    for (const { severity, properties, message } of errors) {
      issueCommand(severity, properties, message);
    }

    endGroup();

    return '';
  },
};

export default GitHubActionsReporter.format;
