import { issueCommand, issue } from '@actions/core/lib/command';
import { CLIEngine } from 'eslint';

const GitHubActionsReporter: CLIEngine.Formatter = (results) => {
  issue('group', 'Lint Annotations');

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

  for (const error of errors) {
    const { message, properties } = error;
    issueCommand('error', properties, message);
  }

  issue('endgroup');

  return '';
};

export = GitHubActionsReporter;
