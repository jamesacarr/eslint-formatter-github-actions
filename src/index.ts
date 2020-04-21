import { startGroup, endGroup } from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';
import { CLIEngine } from 'eslint';

const GitHubActionsReporter: CLIEngine.Formatter = (results) => {
  startGroup('Lint Annotations');

  const errors = results.flatMap((result) =>
    result.messages.map((message) => ({
      message: message.message,
      properties: {
        file: result.filePath,
        line: message.line.toString(),
        col: message.column.toString(),
      },
    }))
  );

  for (const { message, properties } of errors) {
    issueCommand('error', properties, message);
  }

  endGroup();

  return '';
};

export = GitHubActionsReporter;
